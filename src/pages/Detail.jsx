import { useParams } from "react-router-dom";

const Detail = (props)=>{
    console.log(props)
    // let [shoes] = useState() props를 받기 귀찮아서 데이터를 한번 더 받아오면 이 데이터를 수정할 일이 있으면 두번 수정해야된다.
    // URL 파라미터에 이상한거 입력하면(id라는 변수가 이상하면) 상품이 없다는 UI 보여주세요 -> 아래 리턴문 조건식으로 처리

    let {id} = useParams();
    console.log(id)

    return(
        <div className="container">
        <div className="row">
            <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            {/*
            /detail/0 접속시 0번째 상품말고 상품 id가 0인걸 보여주면 좋을듯 
            id변수를 그대로 가져다가 쓰면 만약 정렬버튼이 있을때 인덱스가 뒤바뀌게 되어 상세페이지가 이상해진다.
            해결방법 : 데이터안에 고유의 id를 가지고 보여주면 된다.
            */}
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}원</p>
            <button className="btn btn-danger">주문하기</button> 
            </div>
        </div>
        </div> 
    )
}

export default Detail;