import React, { Fragment } from "react";
import { BehaviorSubject } from "rxjs";
import "./loading.css";

// The Main Subject/Stream to be listened on.
const loadingSubject = new BehaviorSubject(false);

export const addLoading = () => {
	loadingSubject.next(true);
};

export const removeLoading = () => {
	loadingSubject.next(false);
};

export const Loader = () => {
	return (
		<Fragment>
			<div className="overlay-background"></div>
			<div className="eve-loader"></div>
		</Fragment>
	);
};

export function Loading(props: any) {
	// Used for unsubscribing when our component unmounts
	const [isLoading, setIsLoading] = React.useState(false);
	const [count, setCount] = React.useState(0);

	const toggleLoading = (value: boolean) => {
		if (value === true) {
			setCount((previous) => previous + 1);
		} else {
			setCount((previous) => (previous > 0 ? previous - 1 : 0));
		}
	};

	React.useEffect(() => {
		if (count > 0) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [count]);

	//#region Subscribe Loading
	React.useEffect(() => {
		const subscribe = loadingSubject.subscribe((value: boolean) => {
			toggleLoading(value);
		});
		return () => {
			subscribe.unsubscribe();
		};
	}, []);

	return (
		// display loading icon if isLoading=true
		isLoading ? <Loader /> : <div></div>
	);
}
