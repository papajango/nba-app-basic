import React from "react";
import VideoList from "../../../Widgets/VideoList/videoList";

const VideosMain = () => {
	return (
		<div>
			<VideoList
				type="card"
				title={false}
				loadmore={true}
				start={0}
				amount={10}
			/>
		</div>
	);
};
export default VideosMain;
