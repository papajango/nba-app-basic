import React from 'react';
import { Link } from 'react-router-dom';
import styles from './buttons.css';

const Buttons = props => {
	let template = null;
	switch (props.type) {
		case 'loadmore':
			template = (
				<div className={styles.blueBtn} onClick={props.loadMore}>
					{props.cta}
				</div>
			);
			break;
		case 'linkTo':
			template = (
				<Link to={props.linkTo} className={styles.blueBtn}>
					{props.cta}
				</Link>
			);
			break;
		default:
			template = null;
	}
	return template;
};
export default Buttons;
