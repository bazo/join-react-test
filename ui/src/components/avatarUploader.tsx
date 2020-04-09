import React, { useState, useRef } from "react";
import { DropzoneRef, useDropzone } from "react-dropzone";
import parseDataUrl from "parse-data-url";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { Avatar, Button } from "@material-ui/core";

const createImage = (url: string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", error => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

async function getCroppedImg(src: string, pixelCrop: Area) {
	const image = (await createImage(src)) as CanvasImageSource;
	const canvas = document.createElement("canvas");
	canvas.width = 200;
	canvas.height = 200;
	const ctx = canvas.getContext("2d");

	console.log(pixelCrop);

	ctx.drawImage(image, 0, 0, 200, 200);

	// As Base64 string
	return canvas.toDataURL("image/jpeg");
}

type Props = {
	value: any;
	onAvatarRemove: () => void;
	onAvatarUploaded: (data: string) => void;
};

export const AvatarUploader = ({ onAvatarUploaded, onAvatarRemove }: Props) => {
	const [src, setSrc] = useState(null);
	const [dataUrl, setDataUrl] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [saving, setSaving] = useState(false);
	const [pixelCrop, setPixelCrop] = useState(null as Area);

	const dropzone = useRef<DropzoneRef>();
	const input = useRef<HTMLInputElement>();

	const reader = new FileReader();
	reader.onabort = () => console.log("file reading was aborted");
	reader.onerror = () => console.log("file reading has failed");
	reader.onload = () => {
		setSrc(reader.result);
	};

	const onDrop = (acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => reader.readAsDataURL(file));
	};

	const onCropComplete = (croppedArea: Area, pixelCrop: Area) => {
		setPixelCrop(pixelCrop);
	};

	const onAvatarCropped = async (avatarSrc: string) => {
		setDataUrl(avatarSrc);
		const parsed = parseDataUrl(avatarSrc);
		setSaving(false);
		setSrc(null);
		onAvatarUploaded(parsed);
	};

	const onSave = async () => {
		setSaving(true);

		const image = await getCroppedImg(src, pixelCrop);
		onAvatarCropped(image);
	};

	const removeSrc = () => {
		setSrc(null);
	};

	const { getRootProps, getInputProps, open, acceptedFiles, isDragActive } = useDropzone({
		onDrop,
		accept: ["image/png", "image/jpeg"],
		multiple: false,
	});

	return (
		<div className="boxContent">
			{src ? (
				<>
					<div className="profilePictureBox">
						<a className="remove" onClick={removeSrc} />
						<div className="cropperWrapper">
							<Cropper
								image={src}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
								cropSize={{ width: 100, height: 100 }}
							/>
						</div>
					</div>
					<Button variant="contained" color="secondary" disabled={saving} onClick={onSave}>
						OK
					</Button>
				</>
			) : (
				<section {...getRootProps()}>
					<input {...getInputProps()} ref={input} />
					{isDragActive ? (
						<div className="profilePictureBox dropContainer">
							<p>{"onboarding.profilePicture.dropzoneText"}</p>
						</div>
					) : (
						<div className="profilePictureBox">{<Avatar src={dataUrl} />}</div>
					)}

					<Button
						variant="contained"
						color="secondary"
						disabled={saving}
						onClick={() => {
							input.current.click();
						}}
					>
						Choose photo
					</Button>
				</section>
			)}
		</div>
	);
};

export const AvatarUploaderControl = ({ input: { onChange, value, name }, ...rest }: any) => {
	return <AvatarUploader value={value} onAvatarUploaded={onChange} onAvatarRemove={onChange} />;
};

export default AvatarUploader;
