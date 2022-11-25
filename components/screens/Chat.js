import * as React from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	View,
	Button,
	Image,
	ActivityIndicator,
	Alert,
	TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { readAsStringAsync } from "expo-file-system";
import {
	Ionicons,
	Octicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import IconFont from "@expo/vector-icons/FontAwesome";
import { COLORS, DIMENS } from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLS } from "../constants/API";
import { AuthContext } from "../contexts/auth";
import { tokensRefresh, SAVE_LOCAL_USER } from "../helpers/functions";

export default function Chat({ route, navigation }) {
	const [isLoading, setLoading] = React.useState(true);
	const [type, setType] = React.useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [isCameraReady, setIsCameraReady] = React.useState(false);
	const [image, setImage] = React.useState();
	const [viewImage, setViewImage] = React.useState(false);
	const cameraRef = React.useRef();
	const scrollViewRef = React.useRef();
	const [chats, setChats] = React.useState([]);
	let [msg, setMsg] = React.useState("");
	let [chatId, setChatId] = React.useState(null);
	let [cameraOn, setCameraOn] = React.useState(false);
	const { user, setUser } = React.useContext(AuthContext);

	const chatIdParam = route?.params?._id || undefined;
	const usersParam = route?.params?.users;
	const name = usersParam
		.filter((participant) => participant.id !== user.id)
		.map((participant) => participant.name)
		.join(", ");

	let currentTime = new Date();

	const convertMessageObject = (message) => ({
		msg: message.content,
		image: message.image,
		senderId: message.sender._id,
		senderName: message.sender.name,
		time: new Date(message.createdAt),
		status: 1,
		backendId: message._id,
	});
	const getChatMessages = async (user, chatId) => {
		try {
			// try obtaining the information from the server
			const response = fetch(`${URLS.BASE}/messages/${chatId}`, {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Accept: "application/json",
					Authorization: `Bearer ${user.tokens.access}`,
				},
			});

			const messages = await response.then(async (response) => {
				if (response.status === 401) {
					const newUser = await tokensRefresh(user);

					if (newUser === null) {
						Alert.alert(
							"Login expired!",
							"Please sign out once and sign in again",
							[
								{
									text: "Cancel",
									onPress: () => navigation.goBack(),
								},
							]
						);
						return;
					}
					setUser(newUser);
					return await getChatMessages(newUser, chatId);
				}
				return response.json();
			});

			if (messages) {
				const chats = messages.map(convertMessageObject);
				await AsyncStorage.setItem(chatId, JSON.stringify(chats));
				setChats(chats);
				setLoading(false);
			}
		} catch (e) {
			console.log(
				"Network error occurred while obtaining chat history, so use the local data",
				e
			);

			try {
				const conversation = await AsyncStorage.getItem(chatId);
				const messages = JSON.parse(conversation) || [];
				setChats(
					messages.map((message) => ({
						...message,
						time: new Date(message.time),
					}))
				);
				setLoading(false);
			} catch (e) {
				console.log("Get chats", e);
			}
		}
	};

	const getChatId = async (chatUsers) => {
		try {
			return await AsyncStorage.getItem(chatUsers);
		} catch (e) {
			console.log(e);
		}
	};
	const makeChatId = async () => {
		if (chatIdParam !== undefined) {
			setChatId(chatIdParam);
			getChatMessages(user, chatIdParam);
			return;
		}

		// sort to ensure the equivalent string
		const chatUsers = [...new Set(usersParam.map((user) => user._id))]
			.sort()
			.join(",");
		const savedChatId = await getChatId(chatUsers);
		if (typeof savedChatId === "string") {
			setChatId(savedChatId);
			getChatMessages(user, savedChatId);
			return;
		}

		const response = await fetch(`${URLS.BASE}/chats`, {
			method: "POST",
			body: JSON.stringify({
				userId: usersParam.map((user) => user._id),
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Accept: "application/json",
				Authorization: `Bearer ${user.tokens.access}`,
			},
		});

		const jsonData = await response.json();
		const chatId = jsonData._id;
		await AsyncStorage.setItem(chatUsers, chatId);
		setChatId(chatId);
		getChatMessages(user, chatId);
	};
	const sendMessage = async (user, chat) => {
		const response = fetch(`${URLS.BASE}/messages`, {
			method: "POST",
			body: JSON.stringify({
				sender: user.id,
				content: chat.msg,
				chatId: chatId,
				image: chat.image
					? await readAsStringAsync(chat.image, {
							encoding: "base64",
					  })
					: null,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Accept: "application/json",
				Authorization: `Bearer ${user.tokens.access}`,
			},
		});

		const data = await response.then(async (response) => {
			if (response.status === 401) {
				const newUser = await tokensRefresh(user);

				if (newUser === null) {
					Alert.alert(
						"Login expired!",
						"Please sign out once and sign in again",
						[
							{
								text: "Cancel",
								onPress: () => navigation.goBack(),
							},
						]
					);
					return;
				}
				setUser(newUser);
				return await sendMessage(newUser, chat);
			}
			return response.json();
		});

		if (data) {
			const newChats = [
				...chats,
				{
					...chat,
					status: 1,
					backendId: data._id,
				},
			];

			setChats(newChats);
			await AsyncStorage.setItem(
				String(chatId),
				JSON.stringify(newChats)
			);
		}
	};
	const processMessage = async () => {
		setCameraOn(false);

		const newChat = {
			msg,
			image,
			senderId: user.id,
			senderName: "You",
			time: new Date(),
			status: 0,
			backendId: null,
		};

		const newChats = [...chats, newChat];
		setChats(newChats);
		await AsyncStorage.setItem(String(chatId), JSON.stringify(newChats));

		setImage(undefined);
		setMsg("");
		await sendMessage(user, newChat);
	};

	const toggleCameraType = () => {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	};
	const onCameraReady = () => {
		setIsCameraReady(true);
	};
	const takePicture = async () => {
		if (cameraRef.current) {
			const options = {
				quality: 1,
				base64: true,
				skipProcessing: true,
			};
			const data = await cameraRef.current.takePictureAsync(options);
			const source = data.uri;
			if (source) {
				setImage(data.uri);
			}
		}
	};

	React.useEffect(() => {
		makeChatId();
	}, []);
	const Amessage = ({ chat, style }) => {
		let statusIcon = <Feather name="clock" />;
		switch (chat?.status) {
			case 0: // sending
				statusIcon = <Feather name="clock" />;
				break;
			case 1: // sent
				statusIcon = <Feather name="check" />;
				break;
			case 2: // read
				statusIcon = <Ionicons name="checkmark-done" />;
				break;
			case 3:
				statusIcon = <Ionicons name="checkmark-done" />;
				break;
			default:
				statusIcon = <Feather name="clock" />;
				break;
		}

		return (
			<View style={style}>
				<View>
					<Text style={STYLES.messageName}>
						{chat.senderId == user.id ? "You" : chat.senderName}
					</Text>
				</View>
				<Text>{chat.msg}</Text>
				{chat.image && (
					<TouchableOpacity onPress={() => setViewImage(chat.image)}>
						<Image
							source={{ uri: chat.image }}
							style={STYLES.image}
						/>
					</TouchableOpacity>
				)}
				<View style={STYLES.messageTimeContainer}>
					{statusIcon}
					<Text style={STYLES.messageTime}>
						{chat.time.getHours()}:
						{chat.time.getMinutes().toString().padStart(2, "0")},{" "}
						{chat.time.toDateString()}
					</Text>
				</View>
			</View>
		);
	};
	const RevealImage = ({ image }) => {
		return (
			<View style={STYLES.revealContainer}>
				<TouchableOpacity style={STYLES.revealImageClose}>
					<Ionicons
						name="close"
						size={34}
						color="white"
						onPress={() => setViewImage(undefined)}
					/>
				</TouchableOpacity>
				<Image source={{ uri: image }} style={STYLES.revealedImage} />
			</View>
		);
	};
	if (cameraOn) {
		// if (!permission)
		// 	<View>
		// 		<Text>You app needs permission to your camera.</Text>
		// 	</View>;

		if (!permission?.granted)
			return (
				<View>
					<Text>We need permission to Open your Camera</Text>
					<Button
						onPress={requestPermission}
						title="Grant Permission"
					/>
				</View>
			);

		return (
			<View style={STYLES.container}>
				<View style={STYLES.buttonContainer}>
					<TouchableOpacity
						style={STYLES.button}
						onPress={() => setCameraOn(false)}>
						<Ionicons name="close" size={34} color="white" />
					</TouchableOpacity>
				</View>
				{!image ? (
					<Camera
						style={STYLES.camera}
						ratio="16:9"
						ref={cameraRef}
						onCameraReady={onCameraReady}
						useCamera2Api={true}
						onMountError={(error) =>
							console.log("Camera error", error)
						}
						type={type}>
						<View style={STYLES.cameraInner}></View>
					</Camera>
				) : (
					<Image source={{ uri: image }} style={STYLES.camera} />
				)}
				{!image ? (
					<View style={STYLES.buttonContainer}>
						<TouchableOpacity
							style={STYLES.button}
							disabled={!isCameraReady}
							onPress={toggleCameraType}>
							<MaterialIcons
								name="flip-camera-android"
								size={34}
								color="white"
							/>
							<Text style={STYLES.textCaption}>
								{type == "CameraType.front"
									? "Selfie mode"
									: "Back Camera"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={STYLES.button}
							disabled={!isCameraReady}
							onPress={takePicture}>
							<MaterialIcons
								name="check-circle-outline"
								size={34}
								color="white"
							/>
							<Text style={STYLES.textCaption}>Take Photo</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={STYLES.buttonContainer}>
						<TouchableOpacity
							style={STYLES.button}
							disabled={!isCameraReady}
							onPress={() => setImage(undefined)}>
							<Ionicons
								name="md-arrow-back-circle"
								size={34}
								color="white"
							/>
							<Text style={STYLES.textCaption}>Re-take</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={STYLES.button}
							disabled={!isCameraReady}
							onPress={async () => {
								await processMessage();
							}}>
							<MaterialIcons
								name="check-circle-outline"
								size={34}
								color="white"
							/>
							<Text style={STYLES.textCaption}>Send Photo</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
	if (viewImage) {
		return <RevealImage image={viewImage} />;
	}

	return (
		<>
			<View style={STYLES.messageHeader}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Feather
						name="arrow-left"
						size={30}
						strokeSize={4}
						color={COLORS.BLACK}
					/>
				</TouchableOpacity>
				<IconFont
					name="user"
					size={30}
					strokeSize={4}
					style={STYLES.icon}
					color={COLORS.BLACK}
				/>
				<View style={STYLES.messageHeaderInner}>
					<Text style={STYLES.messageReceiver}>{name}</Text>
					<Text style={STYLES.lastSeen}>
						Last seen {currentTime.toLocaleDateString()} at{" "}
						{currentTime.toLocaleTimeString()}
					</Text>
				</View>
			</View>
			{isLoading ? (
				<View style={STYLES.loadingStyle}>
					<ActivityIndicator color={COLORS.ACCENT_1} size={"large"} />
				</View>
			) : (
				<ScrollView
					ref={scrollViewRef}
					onContentSizeChange={() =>
						scrollViewRef.current.scrollToEnd()
					}
					contentContainerStyle={STYLES.contentContainerStyle}
					style={STYLES.threadBody}
					keyboardDismissMode="on-drag">
					{chats?.map((chatItem, index) => (
						<Amessage
							style={[
								STYLES.message,
								chatItem.senderId === user.id
									? STYLES.you
									: STYLES.other,
							]}
							key={index.toString()}
							chat={chatItem}
						/>
					))}
				</ScrollView>
			)}
			<View style={STYLES.messageFooter}>
				<View style={STYLES.messageInput}>
					{/* 					<TouchableOpacity>
						<Feather
							name="smile"
							size={30}
							strokeSize={5}
							color="rgba(0,0,0,.5)"
						/>
					</TouchableOpacity> */}
					<TextInput
						value={msg}
						multiline={true}
						numberOfLines={3}
						style={STYLES.messageInputControl}
						onChangeText={(text) => setMsg(text)}
						placeholder={"Type a message"}
						// onFocus={() => setKeyboardStatus(true)}
					/>
					{/* <TouchableOpacity>
						<MaterialCommunityIcons
							name="paperclip"
							size={24}
							color="black"
						/>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={() => setCameraOn(true)}>
						<Ionicons name="camera" size={28} color="black" />
					</TouchableOpacity>
				</View>
				{/* {msg?.length > 0 ? ( */}
				<TouchableOpacity
					style={STYLES.messageInputBtn}
					onPress={async () => {
						await processMessage();
					}}>
					<Octicons
						name="paper-airplane"
						size={24}
						color={COLORS.WHITE}
						backgroundColor={COLORS.ACCENT_1}
					/>
				</TouchableOpacity>
				{/* 		) : (
					<TouchableOpacity style={STYLES.messageInputBtn}>
						<IconFont
							name="microphone"
							size={25}
							strokeSize={5}
							color={COLORS.WHITE}
							backgroundColor={COLORS.ACCENT_1}
						/>
					</TouchableOpacity>
				)} */}
			</View>
		</>
	);
}
const STYLES = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.SECONDARY,
	},
	header: {
		flex: 1,
		borderColor: COLORS.ACCENT_1,
	},
	body: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
	},

	messageHeader: {
		padding: 10,
		flexDirection: "row",
		backgroundColor: COLORS.ACCENT_1,
	},
	messageHeaderInner: {
		paddingLeft: 20,
	},
	messageReceiver: {
		fontWeight: "bold",
	},
	lastSeen: {
		fontSize: 9,
	},
	messageName: {
		textAlign: "left",
		color: "#064374",
	},
	messageTimeContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	messageTime: {
		textAlign: "right",
		color: "#064374",
		flexGrow: 1,
	},
	message: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 0.5,
		elevation: 1,
		marginBottom: 8,
		borderRadius: 8,
		padding: 10,
		paddingBottom: 5,
	},
	threadBody: {
		flex: 2,
		padding: 20,
	},
	loadingStyle: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	contentContainerStyle: {
		paddingBottom: 40,
	},
	messageInput: {
		backgroundColor: COLORS.WHITE,
		borderRadius: 50,
		flexDirection: "row",
		flex: 3,
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
	},
	messageInputEmoji: {
		flex: 1,
	},
	messageInputControl: {
		flex: 2,
		padding: 7,
		paddingLeft: 5,
		paddingRight: 5,
	},
	messageInputBtn: {
		backgroundColor: COLORS.PRIMARY,
		width: 45,
		height: 45,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	messageFooter: {
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
	},
	title: {
		fontWeight: "bold",
		color: COLORS.SECONDARY,
		textAlign: "center",
	},
	alert: {
		color: COLORS.GREY,
		textAlign: "center",
		marginTop: 15,
	},
	listTitle: {
		color: COLORS.BLACK,
		fontSize: 16,
		fontWeight: "bold",
	},
	subtitle: {
		flexDirection: "row",
	},
	label: {
		fontWeight: "bold",
		marginRight: 5,
	},
	leftHeader: {
		flex: 1,
		paddingLeft: 10,
	},
	centerHeader: {
		flex: 2,
		flexDirection: "row",
	},
	yesText: {
		color: COLORS.PRIMARY,
	},
	rightHeader: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	icon: {
		marginLeft: 10,
	},
	you: {
		backgroundColor: COLORS.WHITE,
	},
	other: {
		backgroundColor: "#C5E3FC",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "black",
	},
	camera: {
		flex: 2,
	},
	cameraInner: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
	},
	button: {
		flex: 1,
		alignSelf: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	textCaption: {
		color: "#fff",
	},
	image: {
		width: "100%",
		height: 100,
		resizeMode: "cover",
		borderRadius: 5,
		borderStyle: "solid",
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 5,
	},
	revealContainer: {
		flex: 1,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	revealedImage: {
		width: "100%",
		height: "50%",
		resizeMode: "cover",
	},
	revealImageClose: {
		marginBottom: 50,
	},
});
