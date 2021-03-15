var getBlacklistRE = function getBlacklistRE(){
	// return new RegExp("(.*\\android\\.*|.*\\__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$");
	return new RegExp('D:/Libraries/D_Documents/Work/eMall/eMall-frontend/.git/objects/maintenance.lock');
}

module.exports = {
	resolver: {
		"blacklistRE": getBlacklistRE(),
	}
};