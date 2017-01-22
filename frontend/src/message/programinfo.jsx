var React = require('react');
import {Link} from 'react-router'
var APIkey = require('../../../APIkey');
var singleProgram = require('../../../backend/seed/exAPI.js');
import $ from 'jquery'

const ProgramInfo = React.createClass({
	getInitialState(){
		return({
			programInfo:''
		})
	},
	componentDidMount(){
		//can do search with program_numeric_id as params
		let zipcode = 10001
		let program_id = this.params.programId
		$.ajax({
		url: 'https://c4q-dot-searchbertha-hrd.appspot.com/_ah/api/search/v1/zipcodes/'+zipcode+'/programs/'+program_id+'?api_key='+APIkey+
		})
		.done((info)=>this.setState({prgramInfo:info}))
		// this.setState({
		// 	programInfo: singleProgram.programs[0]
		// })
	},
	showDiv(){
			$('.messagepage').css({
				'display':'initial',
				'transition':'1s'
			})
	},
	alert(){
		alert('Message Sent!')
	},
	render(){
		console.log(this.state.programInfo)
			if(this.state.programInfo){
				let info = this.state.programInfo;
				return(
					<div>
						<h2>{info.name}</h2>
						<h3>by {info.provider_name}</h3>
						<p>{info.description}</p>
						<p><strong>Services this program provides:</strong></p>
						{info.service_tags.join(', ')}
						<br/><br/>
						<button onClick={this.showDiv}>Apply to volunteer</button>
						<br/><br/>
						<div className='messagepage'>
						<p>Send a message to the program:</p>
						<textarea placeholder='Let them know why you want to volunteer for this program' />
						<br/>
						<button onClick={this.alert}>Send</button>
						</div>
						
					</div>
				)
			}else{
				return(
					<p>loading...</p>
				)
			}	
	}
})

export default ProgramInfo