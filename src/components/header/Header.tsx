import Logo from './components/Logo';

export default function Header() {

	return (
		<div className="header px-[26px] bg-primary min-h-[80px] flex justify-start items-center">
			<Logo/>
		</div>
	);
}