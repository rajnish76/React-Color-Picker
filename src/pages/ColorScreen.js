import './Colors.css';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Card, Col, Row, notification, Input } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { colors } from '../assets/data';
import * as animationData from '../assets/notFound.json';

const { Meta } = Card;
const { Search } = Input;

const ColorScreen = () => {
   const [colorData, setColorData] = useState(colors);

   const onSearch = (value) => {
      if (value) {
         const newData = colors.filter((data) => {
            const itemData = data.name.toUpperCase();
            const textData = value.toUpperCase();
            return itemData.indexOf(textData) > -1;
         });
         setColorData(newData);
      } else {
         let arr = colors || [];
         setColorData([...arr]);
      }
   };

   const onCopy = (item) => {
      const args = {
         message: `Color is Copied`,
         description: `${item.name} --> ${item.hex}`,
         duration: 2
      };
      notification.open(args);
   };

   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice'
      }
   };

   return (
      <div className="container">
         <div className="top-container">
            <h3 className="title">ColorPicker</h3>
            <Search
               placeholder="search color"
               onChange={(event) => onSearch(event.target.value)}
               onSearch={onSearch}
               style={{ width: 200 }}
            />
         </div>
         <h1 className="mainTitle">Click to Copy</h1>
         <h2 className="subTitle">Select perfect color</h2>
         {colorData.length > 0 && (
            <Row style={{ overflow: 'hidden' }} gutter={[14, 14]}>
               {colorData.map((item, i) => {
                  return (
                     <Col key={i} xs={12} sm={12} md={8} lg={6} className="colorCol">
                        <CopyToClipboard text={item.hex} onCopy={() => onCopy(item)}>
                           <Card
                              title={item.name}
                              hoverable
                              style={{ overflow: 'hidden' }}
                              cover={<div style={{ backgroundColor: `${item.hex}`, height: '180px' }} />}>
                              <Meta title={item.hex} />
                           </Card>
                        </CopyToClipboard>
                     </Col>
                  );
               })}
            </Row>
         )}
         {colorData.length <= 0 && (
            <Row justify="center" style={{ marginTop: '60px' }}>
               <Col>
                  <h1>Not Color Found</h1>
                  <Lottie options={defaultOptions} height={200} width={200} />
               </Col>
            </Row>
         )}
      </div>
   );
};

export default ColorScreen;
