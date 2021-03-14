import React, {Component} from "react"
import { Launch } from "../../services/LaunchService";
import {Menu, MenuItem} from '@material-ui/core';


interface IProps {
    launch: Launch;
    anchorEL?: null | HTMLElement;
    handleCloseMenu: Function;

}


class MenuMore extends Component<IProps, any> {

    openExternalLink = (link: string|undefined) => {
        window.open(link, "_blank");
        this.props.handleCloseMenu(); 
    }

    render() {
    const {launch, anchorEL, handleCloseMenu} = this.props
        return(
            <Menu id="long-menu" anchorEl={anchorEL} open={Boolean(anchorEL)} onClose={() => handleCloseMenu()}>
                {launch.webcast && <MenuItem onClick={() => this.openExternalLink(launch.webcast)}>Webcast</MenuItem>}
                {launch.presskit && <MenuItem onClick={() => this.openExternalLink(launch.presskit)}>Presskit</MenuItem>}
                {launch.article && <MenuItem onClick={() => this.openExternalLink(launch.article)}>Article</MenuItem>}
                {launch.wikipedia && <MenuItem onClick={() => this.openExternalLink(launch.wikipedia)}>Wikipedia</MenuItem>}
            </Menu>
        )
    }

}

export default MenuMore;