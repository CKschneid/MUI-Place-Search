import React, {Component, PropTypes} from 'react'
import axios from 'axios'
// MUI imports
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

class PlaceSearch extends Component{
  constructor(props){
  	super(props)

  	this.state = { predictions: [], selection:'', details: {} }

    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
  }
  handleUpdateInput(value){
  // TODO: add google config props to request string
/*
    const {googleConfig} = this.props
    let customConfig = ''
    for(configItem in googleConfig){
      customConfig +=
    }
*/
    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${this.props.myKey}`)
          .then( result => {
            this.setState({ predictions: result.data.predictions})
          })
  }
  handleNewRequest(chosenRequest, index){ // where chosenRequest is the string as it appears in the input field
    const selection = this.state.predictions.find( prediction => chosenRequest == prediction.description)
    const {place_id} = selection

    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.props.myKey}`)
          .then( response => {
            this.props.handlePlaceSelect(response.data)
          })

  }
  render(){
    const dataSource = this.state.predictions.map(prediction => prediction.description)

    return(
        <div>
          <AutoComplete
            dataSource={dataSource}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            {...this.props}
          />
        </div>

    )
  }
}

const {oneOf, shape, string, func, array, bool, object, node, number} = PropTypes
PlaceSearch.propTypes = {
  // Google props
  myKey: string.isRequired,
  googleConfig: shape({
    offset: number,
    location: string, // lat,long
    radius: number, // # of meters
    language: string, // language code
    types: oneOf(['geocode', 'address', 'establishment', '(regions)', '(cities)',
                  'locality', 'sublocality', 'postal_code', 'country', 'administrative_area_level_1', 'administrative_area_level_2']),
    components: string,
    strictbounds: bool
  })
  // MUI props
  handlePlaceSelect: func,
  floatingLabelText: string,
  anchorOrigin: object,
  animated: bool,
  animation: func,
  disableFocusRipple: bool,
  errorStyle: object,
  errorText: node,
  filter: func,
  fullWidth: bool,
  hintText: node,
  listStyle: object,
  maxSearchResults: number,
  menuCloseDelay:  number,
  menuProps: object,
  menuStyle: object,
  onClose: func,
  openOnFocus: bool,
  popoverProps: object,
  searchText: string,
  style: object,
  targetOrigin: object,
  textFieldStyle: object
}
PlaceSearch.defaultProps = {
  label: 'Location'
}

export default PlaceSearch
