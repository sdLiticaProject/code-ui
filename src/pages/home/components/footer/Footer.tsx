import React from "react";
import * as Sc from "../../HomePage.styles";

const Footer = (): JSX.Element => {
  return (
    <Sc.FooterWrapper>
      <Sc.FooterContent>
        <Sc.FooterLogo
          width="84"
          height="43"
          viewBox="0 0 84 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="84" height="43" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use
                xlinkHref="#image0"
                transform="translate(0 -0.0112921) scale(0.00361011 0.0070523)"
              />
            </pattern>
            <image
              id="image0"
              width="277"
              height="145"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </Sc.FooterLogo>
        <Sc.FooterInfo>
          <div>
            <span> by</span> <a href="https://sdcloud.io/">sdCloud</a>
          </div>
          <div>© Copyright 2019-{new Date().getFullYear()}</div>
          <div>Version {process.env.PROJECT_VERSION || `20.0.1.4/20.1.3.4`}</div>
        </Sc.FooterInfo>
      </Sc.FooterContent>
    </Sc.FooterWrapper>
  );
};

export default Footer;
