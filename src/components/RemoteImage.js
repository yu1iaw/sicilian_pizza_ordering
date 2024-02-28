import { Image } from "react-native";
import { memo, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";



export const RemoteImage = memo(({ path, fallback, ...imageProps }) => {
	const [image, setImage] = useState("");


	useEffect(() => {
		if (!path) return;

		(async () => {
			setImage("");
			const { data, error } = await supabase.storage
                .from("product-images")
                .download(path);

			if (error) {
				console.log(error);
			}

			if (data) {
				const fr = new FileReader();
				fr.readAsDataURL(data);
				fr.onload = () => {
					setImage(fr.result);
				};
			}
		})();

	}, [path]);



	return <Image source={{ uri: image || fallback }} {...imageProps} />;
});

