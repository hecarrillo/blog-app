import React, {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {createPost} from '../graphql/mutations';

class CreatePost extends Component {

    state = {
        postOwnerId: "",
        postOwnerUsername:"",
        postTitle:"",
        postBody: ""
    }

    componentDidMount = async() => {
        
    }

    //Used to handle when user presses submit, although this does not
    //update the state when it changes. (See handleChange())
    handleSubmit = async event => {
        event.preventDefault();
        const input = {
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createPost, {input}));

        this.setState({postTitle:"", postBody:""});
    }

    handleChange = event => this.setState({
        [event.target.name] : event.target.value
    })

    render() {

        return (
            <form className="add_post" onSubmit={this.handleSubmit}>
                <input 
                    style={{
                        fontSize: '19'
                    }} 
                    type="text" 
                    placeholder="Title"
                    name="postTitle"
                    required
                    onChange={this.handleChange}
                    value={this.state.postTitle}
                /> 
                
                <textarea
                    type = "text"
                    name= "postBody"  
                    rows= "3"  
                    cols= "40"  
                    required  
                    placeholder= "New Blog Post"
                    style={{
                        fontSize: '19',
                        width: "90%"
                    }}
                    onChange={this.handleChange}
                    value={this.state.postBody}
                />

                <input
                    type="submit"
                    className="btn"
                />
            </form>

        );
    }
}

export default CreatePost;
