import BasicComponent from "./BasicComponent";

class InfiniteScrollableComponent extends BasicComponent {
	constructor(props) {
		super(props);

		this.state = {
			pageNumber: 0,
			pageSize: 0,
			totalCount: 0,
			list: [],
			loaded: false,
		}
	}
	componentDidMount() {
		super.componentDidMount();
		window.onscroll = ()=>{
			let height = document.body.scrollHeight;
			let offset = window.innerHeight + window.scrollY;

			if (offset === height) {
				this.loadNextPage();
			}
		};
	}
	loadNextPage = ()=>{
		let {pageNumber,totalCount, pageSize} = this.state;
		if (totalCount > (pageNumber+1)*pageSize && this.loadPage){
			this.loadPage(pageNumber + 1);
		}
	}
	setupList = (response,pageNumber)=>{
		if (this._isMounted){
			let {list,totalCount} = this.state;
			if (pageNumber){
				list = list.concat(response.data.list);
			}else{
				list = response.data.list;
				totalCount = response.data.totalCount;
			}
			this.setState({
				list,
				totalCount,
				pageSize: response.data.pageSize,
				pageNumber: pageNumber||0,
				loaded: true,
			})
			return list;
		}
		return null;
	}
	render() {
        return null;
    }
}

export default InfiniteScrollableComponent;