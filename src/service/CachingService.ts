
export class CachingService {

	static readKey<T>(key : string) : T {
		let val = readCache(key);
		return val != null ? JSON.parse(val) : val;
	}

	static setKey<T>(key : string, value : T) {
		writeCache(key, JSON.stringify(value));
	}

	static clearKey(key : string) : void {
		clearCache(key);
	}

}

function readCache<T>(key : string) : string | null {
	return localStorage.getItem(key);
}
function writeCache(key : string, value : string) {
	localStorage.setItem(key, value);
}
function clearCache(key : string) {
	localStorage.removeItem(key);
}
