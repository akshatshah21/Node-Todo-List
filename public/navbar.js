document.addEventListener('DOMContentLoaded', () => {
	if(success_msg) {
		M.toast({html:success_msg, classes:'light-blue lighten-3 black-text circular large'});
	}
	if(error_msg) {
		M.toast({html:error_msg, classes:'light-blue lighten-3 black-text circular large'});
	}
	if(error) {
		M.toast({html:error, classes:'light-blue lighten-3 black-text circular large'});
	}
})
