import React from "react";

import styles from "../videoList.module.css";
import VideoListTemplate from "../videoListTemplate";

const VideoRelated = props => {
	return (
		<div className={styles.relatedWrapper}>
			<VideoListTemplate data={props.data} teams={props.teams} />
		</div>
	);
};
export default VideoRelated;
