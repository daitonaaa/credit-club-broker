import React from 'react';

import { Button } from '@creditclub/react-components';

import styles from './CriticalError.module.scss';


const CriticalError = () => (
	<div className={styles.wrapper}>
		<div className={styles.sorry}>
			<i className="zmdi zmdi-flip" />
		</div>
		<div className={styles.text}>
			Упс... Вероятно, что то пошло не так. <br />
			Мы уже знаем о проблеме и решаем её. <br />
		</div>
		<div className={styles.button}>
			<Button
				title="Обновить"
				onClick={() => {
					window.location.reload();
				}}
			/>
		</div>
	</div>
);

export default CriticalError;
