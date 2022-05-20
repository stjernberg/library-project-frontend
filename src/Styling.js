import styled from "styled-components";

//----------General styling--------------
export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  //::contentbackground-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//------------Form-styling-------------
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

//------------Post-styling-------------
export const Post = styled.div`
  margin: 50px;
  background: #f5f5f5;
  padding: 15px;
  width: 350px;
  height: 410px;
  border-radius: 2px;
  margin-right: 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 10px #707070;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 899px) {
    height: auto;
  }

  @media (max-width: 535px) {
    min-width: 80%;
  }
`;

export const PostsWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

//---------categories--------------

export const TableWrapper = styled.section`
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

//---------users--------------
export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  margin-top: 40px;
  margin: auto;
  align-self: center;

  span {
    font-weight: bold;
  }

  .btn {
    background: #5bc0de;
    color: #fff;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
`;
