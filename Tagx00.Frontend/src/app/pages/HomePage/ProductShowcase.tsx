import React from 'react';
import styled from "styled-components";
import { SvgImg } from "../../components/Common/SvgImg";
import { LocaleMessage } from "../../internationalization/components";
import { ID_PREFIX } from "./index";
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import QueueAnim from 'rc-queue-anim';

const ProductShowcaseContainer = styled.div`
padding: 48px 8px 48px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
 
  & > * {
    width: 50%;
    min-width: 400px;
    flex-grow :1;
  }
  
`;

const TextContainer = styled.div`

`;

const Content = styled.div`
  text-align: center;
    font-size: 24px;
    * {
      margin-top: 16px;
    }
;`;

export function ProductShowcase(props: {to: () => void}){
  return <ProductShowcaseContainer>

    <SvgImg filePath={"tag_x00_logo_square.svg"} width={300} height={300}/>
    <Content>
      <QueueAnim delay={300} className="queue-simple">
      <h1 key={"a"}>Tag x00</h1>
      <p key={"b"}><LocaleMessage id={ID_PREFIX + "productDescription"}/></p>
      <Button key={"c"} type={"primary"} size={"large"} onClick={props.to}>
        <LocaleMessage id={ID_PREFIX + "enter"}/>
      </Button>
      </QueueAnim>
    </Content>

  </ProductShowcaseContainer>
}
