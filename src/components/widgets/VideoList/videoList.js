import React, { Component } from "react";
import axios from "axios";
import styles from "./videoList.module.css";
import Button from "../Buttons/buttons";
import VideoListTemplate from "./videoListTemplate";
import { URL } from "../../../config";

class VideoList extends Component {
	state = {
		teams: [],
		videos: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};
	renderTitle = () => {
		return this.props.title ? (
			<h3>
				<strong>NBA</strong> Videos
			</h3>
		) : null;
	};
	request = (start, end) => {
		if (this.state.teams.length < 1) {
			axios.get(`${URL}/teams`).then(response => {
				this.setState({
					teams: response.data
				});
			});
		}
		axios
			.get(`${URL}/videos?_start=${start}&_end=${end}`)
			.then(response => {
				this.setState({
					videos: [...this.state.videos, ...response.data],
					start,
					end
				});
			});
	};
	componentWillMount() {
		this.request(this.state.start, this.state.end);
	}
	loadMore = () => {
		let end = this.state.end + this.state.amount;
		this.request(this.state.end, end);
	};
	renderVideos = () => {
		let template = null;
		switch (this.props.type) {
			case "card":
				template = (
					<VideoListTemplate
						data={this.state.videos}
						teams={this.state.teams}
					/>
				);
				break;
			default:
				template = null;
		}
		return template;
	};
	renderButton = () => {
		return this.props.loadmore ? (
			<Button
				type="loadmore"
				loadMore={() => this.loadMore()}
				cta="Load More Videos"
			/>
		) : (
			<Button type="linkTo" cta="More videos" linkTo="/videos" />
		);
	};
	render() {
		return (
			<div className={styles.videoList_wrapper}>
				{this.renderTitle()}
				{this.renderVideos()}
				{this.renderButton()}
			</div>
		);
	}
}
export default VideoList;
