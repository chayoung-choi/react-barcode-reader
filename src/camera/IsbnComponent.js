import React from 'react';
import {isValid, parse} from 'isbn-utils';

const IsbnComponent = ({code}) => {
  // Validate and parse the ISBN code
  const parsedCode = parse(code);
  const isValidCode = isValid(code);

  return (
    <div>
      {isValidCode ? (
        <div>
          <div>ISBN Code: {code}</div>
          {parsedCode && (
            <div>
              <div>ISBN Type: {parsedCode.isbn13 ? 'ISBN-13' : 'ISBN-10'}</div>
              <div>ISBN Prefix: {parsedCode.prefix}</div>
              <div>ISBN Registration Group: {parsedCode.registrationGroup}</div>
              <div>ISBN Registrant: {parsedCode.registrant}</div>
              <div>ISBN Publication: {parsedCode.publication}</div>
              <div>ISBN Check Digit: {parsedCode.checkDigit}</div>
            </div>
          )}
        </div>
      ) : (
        <div>Invalid ISBN code</div>
      )}
    </div>
  );
};

export default IsbnComponent;
