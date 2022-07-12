import React from 'react'
import { Checkbox, FormHelperText, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';
import {PropTypes} from 'prop-types'
import { Field, reduxForm } from 'redux-form'

class CheckboxesGroup extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        instances: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)

        this.classes = {
            root: {
                display: 'flex'
            },
            formControl: {
                margin: '3px',
                float: 'left'
            }
        }
        const networkName = props.name

        const instances = props.instances.map(item => {
            return {name: item.instanceName, value: false}
        })

        this.onChange=props.onChange

        this.state = {
            networkName,
            checkedAll: false,
            instances
        }
        this.handleChange.bind(this)
    }

    render() {
        const {checkedAll} = this.state
        let checkboxes = this.state.instances.map(i => {
            const instanceName=i.name            
            return (
                <FormControlLabel
                    style={{width: '200px'}}
                    control={
                        <Field name={`${instanceName}`} type="checkbox" component={renderInnerCheckboxField} label="instances" checked={checkedAll || i.value} onChange={this.handleChange(i.name)} value={i.value.toString()}/>

                    }
                    label={i.name}
                    key={i.name + i.value}
                > </FormControlLabel>
            )
        })

        const networkName=this.state.networkName
        return (
            <div className={this.classes.root.toString()}>
                <br />
                <FormControl
                    component="fieldset"
                    className={this.classes.formControl.toString()}
                >
                    <FormLabel
                        component="legend"
                        style={{fontWeight: 'bold', fontSize: '20px'}}
                    >
                        {this.state.networkName}
                        <FormControlLabel
                            label="Select All"
                            control={
                                <div>
                                    &nbsp;&nbsp;&nbsp;
                                    <Field name={`network ${networkName}`} type="checkbox" checkboxes={checkboxes} component={renderCheckboxField} label="Sellect all in" checked={checkedAll} onChange={event => {
                                        this.setState({
                                            checkedAll: event.target.checked
                                        })
                                    }}/>
                                </div>
                            }
                        />
                    </FormLabel>
                    <FormGroup style={{display: 'flow-root'}}>
                        {checkboxes}
                    </FormGroup>
                    <FormHelperText>
                        --------------------------------------------------------------------------------
                    </FormHelperText>
                </FormControl>
            </div>
        )
    }

    handleChange(name) {
        const _this = this
        return function(event) {            
            const instances = _this.state.instances.map(i => {
                if (i.name === name) {
                    console.log(event.target.checked)
                    return {name, value: event.target.checked}
                }

                return i
            })

            _this.setState({
                ..._this.state,
                instances
            })
            setTimeout(
                () => {                    
                    _this.onChange(_this.state)
                },
                500
            )
        }
    }
}


const renderCheckboxField = (props) => {
    const { input, label, meta} = props
    console.log("...custom   ",props)
    return (
        <Checkbox
            label={label}
            {...input}

        />
    )}
const renderInnerCheckboxField = ({ input, label, meta: { touched, error }, ...custom }) => {

    return (
        <Checkbox
            label={label}
            error={!!(touched && error)}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )}

const Checkboxes1 = reduxForm({
    form: 'selectingFormValues'  ,
    enableReinitialize: true,
})(CheckboxesGroup)
export default Checkboxes1