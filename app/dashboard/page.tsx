import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      Page

      <div style={{ padding: 24, textAlign: 'center' }}>
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
    </div>
  );
}
