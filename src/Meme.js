import react, {Component} from "react"
class Meme extends Component {
    constructor()    {
        super()
        this.state= {
            topText: "",
            bottomText: "",
            allMemeImgs: [],
            randomImg : "http://i.imgflip.com/1bij.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                
                this.setState({allMemeImgs : memes})
            })        
    }

    handleChange(event){
       
        const {name, value } = event.target
        this.setState({[name] : value})
    }

    handleSubmit(event){
       
        event.preventDefault()
        const random = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[random].url
        this.setState({randomImg : randMemeImg})
    }
 
    render() {
        return (
    
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="Text" name="topText" value={this.state.topText} placeholder="Top Text" onChange={this.handleChange}/>
                    <input type="Text" name="bottomText" value={this.state.bottomText} placeholder="Bottom Text" onChange={this.handleChange} />
                <button>Generate</button>
                </form>
                <br/>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
    
}
 export default Meme