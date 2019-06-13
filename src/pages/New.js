
import React, {Component} from 'react';
import api from '../services/api';
import './New.css';
class New extends Component{
    state = {
        image: null,
        author:'',
        place:'',
        description:'',
        hashtags:'',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state);
        const formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("author", this.state.author);
        formData.append("place", this.state.place);
        formData.append("description", this.state.description);
        formData.append("hashtags", this.state.hashtags);
        api({
            method: "post",
            url: "posts",
            data: formData
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
        this.props.history.push('/');
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleImageChange = (event) => {
        this.setState({image: event.target.files[0]});
    }
    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>
                <input 
                    type="text" 
                    name="author" 
                    placeholder="Autor" 
                    onChange={this.handleChange}
                    value={this.state.author}
                />
                <input 
                    type="text" 
                    name="place" 
                    placeholder="Local"
                    onChange={this.handleChange}
                    value={this.state.place}
                />
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Descrição"
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <input 
                    type="text" 
                    name="hashtags" 
                    placeholder="Hashtags"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;