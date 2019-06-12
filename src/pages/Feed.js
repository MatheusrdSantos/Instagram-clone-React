import React, {Component} from 'react';
import './Feed.css';
import api from '../services/api';
import more from '../assets/more.svg';
import send from '../assets/send.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
class Feed extends Component{
    state = {
        feed: []
    }

    async componentDidMount(){
        const response = await api.get('posts');
        this.setState({feed: response.data});
    }
    render(){
        return (
            <section id="post-list">
                <article>
                    <header>
                        <div className="user-info">
                            <span>Matheus Santos</span>
                            <span className="place">Natal, Brazil</span>
                        </div>
                        <img src={more} alt="Mais"/>
                    </header>
                    <img src="http://localhost:3333/files/my_profile.jpg" alt=""/>
                    <footer>
                        <div className="actions">
                            <img src={like} alt="Like"/>
                            <img src={comment} alt="Comment"/>
                            <img src={send} alt="Send"/>
                        </div>
                        <strong>10 curtidas</strong>
                        <p>Minha nova foto de perfil<span>#novafoto</span></p>
                    </footer>
                </article>
            </section>
        );
    }
}

export default Feed;