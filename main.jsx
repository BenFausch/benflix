 /**
   * @jsx React.DOM
 */
var jsonFile = (function () {
    var json = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'url': 'db.js',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 
var video = jsonFile;


//Making the main component, InstantBox
var InstantBox = React.createClass({
	doSearch:function(queryText){
	
	if(queryText.length>0){
		jQuery('#searchResult').empty().append('you are searching for ');
		jQuery('#searched').empty().append(queryText);
	}else{
		jQuery('#searchResult').empty();
		jQuery('#searched').empty();
		};

		
		
		//get query result
		var queryResult=[];
		this.props.data.forEach(function(video){
			if(video.name.toLowerCase().indexOf(queryText)!=-1)
			queryResult.push(video);
		});
		
		this.setState({
			query:queryText,
			filteredData: queryResult
		})
	},
	getInitialState:function(){
		return{
			query:'',
			filteredData: this.props.data
		}
	},
	render:function(){
		return (
			<div className="InstantBox">
				<h2>Benflix</h2>
				<SearchBox query={this.state.query} doSearch={this.doSearch}/>
				<div id="searchResult"></div>
				<div id="searched"></div>
				<DisplayTable data={this.state.filteredData}/>
			</div>
		);
	}
});

var SearchBox = React.createClass({
	doSearch:function(){
		var query=this.refs.searchInput.getDOMNode().value; // this is the search text
		this.props.doSearch(query);
	},
	render:function(){
		return <input type="text" ref="searchInput" placeholder="find something" value={this.props.query} onChange={this.doSearch}/>
	}
});

var DisplayTable = React.createClass({
	render:function(){
		//making the rows to display
		var rows=[];
		var index = 0;
		this.props.data.forEach(function(video) {
		index++;
		
			var divStyle = '';
			var videoUrl = '';
			var videoTitle = video.name;
			var childTitle;
			var grandchildren = [];


			video['children'].forEach(function(child){

				if(child.path.indexOf('.jpg')>=0){
					divStyle = {
	  					backgroundImage: 'url(\'/' + child.path + '\')'
					};
				}
				else if((child.path.indexOf('.mp4')>=0)){
					videoUrl = child.path;
				}

				//get season
				if(!(child.name.indexOf('.DS_Store')>=0)&&!(child.name.indexOf('.jpg')>=0)&&!(child.name.indexOf('.mp4')>=0)){
					childTitle = child.name;

					//get season children
					child['children'].forEach(function(grandchild){
						grandchildren.push(<li><a className="grandChild" href={grandchild.path}>{grandchild.name}</a></li>);
					});
				}
			});
			

		rows.push(
			<div style={divStyle} id={'bf-' + index}>
				<div id="playBg">
				</div>
				<a href={videoUrl}> &#9658; </a>
				<p>{videoTitle}</p>
				<ul className="seasons">
				<h3>{childTitle}</h3>
				{grandchildren}
				</ul>
			</div>
			)
		});
		//returning the table
		return(

<div id="rowBox">

{rows}</div>
            
		);
	}
});

 
React.renderComponent(<InstantBox data={jsonFile}/>,document.body);

