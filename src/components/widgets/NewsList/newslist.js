import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../config";
import styles from "./newslist.module.css";
import Buttons from "../Buttons/buttons";
import CardInfo from "../CardInfo/cardinfo";

class NewsList extends Component {
	state = {
		items: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount,
		teams: []
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
			.get(`${URL}/articles?_start=${start}&_end=${end}`)
			.then(response => {
				this.setState({
					items: [...this.state.items, ...response.data],
					start,
					end
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	componentWillMount() {
		this.request(this.state.start, this.state.end);
	}

	renderNews(type) {
		let template = null;
		switch (type) {
			case "card":
				template = this.state.items.map((item, i) => {
					return (
						<CSSTransition
							classNames={{
								enter: "newslist_wrapper",
								enterActive: "newslist_wrapper_entered"
							}}
							timeout={500}
							key={i}
						>
							<div className={styles.newslistItem} key={i}>
								<Link to={`/articles/${item.id}`}>
									<CardInfo
										teams={this.state.teams}
										team={item.team}
										date={item.date}
									/>
									<h2>{item.title}</h2>
								</Link>
							</div>
						</CSSTransition>
					);
				});
				break;

			case "cardMain":
				template = this.state.items.map((item, i) => {
					return (
						<CSSTransition
							classNames={{
								enter: "newslist_wrapper",
								enterActive: "newslist_wrapper_entered"
							}}
							timeout={500}
							key={i}
						>
							<Link to={`/articles/${item.id}`}>
								<div className={styles.flex_wrapper}>
									<div
										className={styles.left}
										style={{
											background: `url(/images/articles/${item.image})`
										}}
									>
										<div></div>
									</div>
									<div className={styles.right}>
										<CardInfo
											teams={this.state.teams}
											team={item.team}
											date={item.date}
										/>
										<h2>{item.title}</h2>
									</div>
								</div>
							</Link>
						</CSSTransition>
					);
				});
				break;
			default:
				template = null;
		}

		return template;
	}

	loadMore = () => {
		let end = this.state.end + this.state.amount;
		this.request(this.state.end, end);
	};

	render() {
		return (
			<div>
				<TransitionGroup component="div" className={styles.list}>
					{this.renderNews(this.props.type)}
				</TransitionGroup>

				<Buttons
					type="loadmore"
					loadMore={() => this.loadMore()}
					cta="Load More News"
				/>
			</div>
		);
	}
}
export default NewsList;
