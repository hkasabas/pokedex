
const LocalStorageAdapter = {

	readCache<T>(key : string) : string | null {
		return localStorage.getItem(key);
	},

	writeCache(key : string, value : string) {
		localStorage.setItem(key, value);
	},

	clearCache(key : string) {
		localStorage.removeItem(key);
	}

};


/**
 * Simple key-value caching service that can use arbitrary method for persisting values.
 * Currently, values are persited in localStorage.
 */
export class CachingService {
	private static adapter = LocalStorageAdapter;

	static readKey<T>(key : string) : T {
		let val = this.adapter.readCache(key);
		return val != null ? JSON.parse(val) : val;
	}

	static setKey<T>(key : string, value : T) {
		this.adapter.writeCache(key, JSON.stringify(value));
	}

	static clearKey(key : string) : void {
		this.adapter.clearCache(key);
	}

}

