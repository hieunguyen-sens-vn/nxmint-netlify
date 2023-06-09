'use client';
//THIRD PARTY MODULES
import Persona from 'persona';
import { useCallback } from 'react';

function KYCButton() {
  const _startKOC = useCallback(() => {
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID,
      onLoad: () => {},
      onReady: () => {
        client.open();
      },
      onComplete: ({ inquiryId }) => {
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      },
    });
  }, []);
  return <button onClick={_startKOC}>Start KYC</button>;
}
export default KYCButton;
