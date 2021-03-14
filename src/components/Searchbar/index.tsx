import React, {Component} from 'react';
import {TextField} from "@material-ui/core"
import { Launch } from '../../services/LaunchService';
import {Search} from "@material-ui/icons"

interface IProps{
    allLaunches: Launch[];
    setDisplayLaunches: Function;


}


interface IState{
    inputValue: string;

}

class SearchBar extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: "",

        };
    }

    render() {
        const allLaunches = this.props.allLaunches

        return (
            <TextField
                label="Search launch name"
                margin="normal"
                variant="outlined"
                InputProps={{
                    startAdornment: <Search color="inherit"/>,
                  }}
                value={this.state.inputValue}
                onChange={(event) => {
                    this.setState({inputValue: event.target.value})
                        this.props.setDisplayLaunches(allLaunches.filter(launch => launch.name.toLowerCase().includes(event.target.value.toLowerCase())))
                    }
                }
                style={{width:"40%", marginBottom: "30px"}}
            />
        )
            
    }
}

export default SearchBar; 