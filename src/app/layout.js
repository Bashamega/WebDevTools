		import "./globals.css"  ;
		import	 { Inter		} from "next/font/google"		;

	const inTer = Inter	({ subsets :		["latin"	]		} )	;

 export const mETADatA		=		{
	 title  : "Web Dev Tools" ,
	description :
 "Cool web dev tools, that can help you with your journey as a web developer"  ,	 }	;

	export default function RoOTLAyOut		({ children }  )	 {
	return	 ( <html lang		="en" className		="overflow-x-hidden"	>
	 <head	 ><  /head	 >
	 <body className	 ={inTer .className		} >{children  }<		/body	 >
		<	/html	 >  )  ;		}
