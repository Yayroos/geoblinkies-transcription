import React from 'react';
import './App.css';
import { AppProps, AppState } from './Types';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps){
        super(props);

        this.state = {
            showDupes: false,
            blinkieList: [],
            fields:{
                fileName: "",
                transcript: "",
                tags: ""
            }
        }

        //TODO: read new blinkie file (from folder)
    }

    componentDidMount(){
        this.getBlinkies();
    }

    async getBlinkies(){
        await fetch("https://geoblinkies-test.glitch.me/geoblinkies.json")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({blinkieList: response});
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>New Blinkie:</th>
                            <th>Fill in the details</th>
                            <th>Check for duplicates</th>
                        </tr>
                        <tr>
                            <td>
                                <p>TODO new blinkie will display here</p>
                                <img src={""} alt={"blinkie"}></img>
                            </td>
                            <td>{this.blinkieForm()}</td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Show possuble duplicates?
                                                <InputSwitch checked={this.state.showDupes} onChange={() => this.setState({showDupes: !this.state.showDupes})}></InputSwitch>
                                            </td>
                                        </tr>
                                        {this.state.showDupes ? this.possibleDuplicates(): null}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type='button' onClick={() => this.save()}>Save the Blinkie!</button>

            </div>
        )
    }

    blinkieForm(){
        return (
            <div>
                <table className="top">
                    <tbody>
                        <tr>
                            <td>File name:</td>
                            <td>
                                <InputText value={this.state.fields.fileName} disabled></InputText>
                            </td>
                        </tr>
                        <tr>
                            <td>Transcript:</td>
                            <td>
                                <InputText id='transcript' value={this.state.fields.transcript} onChange={(event) => this.fieldChanged("transcript", event)}></InputText>
                            </td>
                        </tr>
                        <tr>
                            <td>Tags:</td>
                            <td>
                                <InputText id='tags' value={this.state.fields.tags} onChange={(event) => this.fieldChanged("tags", event)}></InputText>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    fieldChanged(fieldName: string, event: React.ChangeEvent<HTMLInputElement>){
        this.setState({fields: {...this.state.fields, [fieldName]: event.target.value}});
    }

    possibleDuplicates(){
        let blinkies = this.state.blinkieList;
        let filtered = blinkies.filter((value) => {
            let match = true;
            match = (this.state.fields.transcript ? this.state.fields.transcript === value.transcript : true);
            if(match) {
                this.state.fields.tags.split(", ").forEach(tag => {
                    if(value.tags){
                        if(!value.tags.includes(tag)){
                            match = false;
                        }
                    } else {
                        console.log("no tags found in blinkie entry:", value);
                        match = false;
                    }
                });
            }
            return match;
        });
        console.log("found", filtered.length, "possible matches");
        return filtered.map((blinkie, index) => <tr key={index}><td><img src={blinkie.name} alt=""></img></td></tr>);
    }

    save(){

    }
}