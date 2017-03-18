import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import PlaceSearch from './PlaceSearch'

const myKey = 'AIzaSyCQcxMezVW-FIo_jP3NHsPe5I9hMviQyZY'

class App extends Component {
  constructor(props){
  	super(props)
  	this.state = {place: {}}

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
  }

  handlePlaceSelect(placeDetails){
    this.setState({place: placeDetails})
    console.log(placeDetails)
  }

  render() {

    return (
      <MuiThemeProvider>
      <div style={{ width: '50%', margin: 'auto'}}>
        <div>
          <PlaceSearch floatingLabelText="Location"
                       myKey={myKey}
                       handlePlaceSelect={this.handlePlaceSelect}
                       googleConfig={{}}/>
        </div>
        <div>
          <Card>
            <CardTitle title="Selected Place place_id"
                       subtitle="Returned upon selection from autocomplete options" />
            <CardText>
              { this.state.place.result == undefined ?
                  'awaiting selection' : this.state.place.result.place_id }
            </CardText>
          </Card>
        </div>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App
