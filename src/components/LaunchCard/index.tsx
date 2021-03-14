import React, {Component} from "react";
import {Card, CardHeader, CardContent, IconButton} from '@material-ui/core';
import styles from './index.module.css'
import {CheckCircle, MoreVert, Cancel} from '@material-ui/icons';
import {Launch} from '../../services/LaunchService'
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import MenuMore from "../../components/MenuMore"
import InfoModal from '../../components/InfoModal'


interface IProps{
    launch: Launch
}

interface IState{
    anchorEl?: null | HTMLElement;
    openModal: boolean

}


class LaunchCard extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            anchorEl: null,
            openModal: false,
        };
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    
    handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseModal = () => {
        this.setState({ openModal: false });
    };
    
    handleClickModal = () => {
        this.setState({ openModal: true });
    };

    getSuccessIcon = (success:boolean) => {
        if(success) {
            return <CheckCircle fontSize="default" style={{color: "#6DA77D"}}/>
        } else {

        }
    }

    render(){
        const launch = this.props.launch

        return(
            <>
                <Card className={styles.card} >
                    <CardHeader
                        className={styles.cardHeader}
                        action={
                            <>
                                <IconButton style={{padding:0}} onClick={this.handleClickMenu} aria-label="more">
                                    <MoreVert  fontSize="large" />
                                </IconButton>

                                <MenuMore launch={launch} anchorEL={this.state.anchorEl} handleCloseMenu={this.handleCloseMenu} />
                            </>
                        }
                    />
                    <CardContent style={{padding:0, cursor: "pointer"}} onClick={() => this.handleClickModal()}>
                        <div className={styles.cardContent}>
                            <img src={launch.image} alt="new" className={styles.image}/>
                            <span className={styles.title}>{launch.name}</span>
                            <div className={styles.attribute}>
                                <span className={styles.attributeFont}>Date</span>
                                <span className={styles.attributeFont}>{format(parseISO(launch.date), "yyyy/MM/dd")}</span>
                            </div>
                            <div className={styles.attribute}>
                                <span className={styles.attributeFont}>All cores success</span>
                                {launch.success ? <CheckCircle fontSize="default" style={{color: "#6DA77D"}}/> : <Cancel fontSize="default" style={{color: "#FF0000"}}/>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <InfoModal launch={launch} open={this.state.openModal} handleClose={this.handleCloseModal}></InfoModal>
            </>
        )
    }
}

export default LaunchCard;