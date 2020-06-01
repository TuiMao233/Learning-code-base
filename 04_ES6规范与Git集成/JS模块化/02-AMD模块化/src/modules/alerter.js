define(['dataService'],function(dateService){
	let data = 'alerter'
	let getToName = () =>{return data +"----"+ dateService.getName()}
	return {getToName}
})