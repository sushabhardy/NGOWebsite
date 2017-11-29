var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function(){
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body:JSON.stringify({
			'name': 'Cersei Lannister',
			'quote': 'Love is a weakness, love no one but your children'
		})
	})
	.then(response => {
		if(response.ok) return response.json()
	})
	.then(data => {
		console.log(data)
	})
}) 

del.addEventListener('click', function(){
	fetch('quotes', {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': 'Cersei Lannister'
		})
	}).then(function(response){
		window.location.reload()
	})
})