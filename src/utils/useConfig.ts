import { useState } from 'react';

export default async function useConfig(key: string) {
  const [result, setResult] = useState<any>();
	const fetchValue = async () => {
		const res = await fetch(`https://api.gabirmotors.com/config/${key}`)
		const data = await res.json()
		console.log(data[0])
		return await data[0]
	}

	const res = await fetchValue();
	return res;
}
