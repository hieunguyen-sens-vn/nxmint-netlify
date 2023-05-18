import z from 'zod';

export const verifyInquirySchema = z
  .object({
    data: z.object({
      attributes: z.object({
        'completed-at': z.string().datetime(),
        'name-first': z.string().nullable(),
        'name-last': z.string().nullable(),
        birthdate: z.string().nullable(),
        'address-street-1': z.string().nullable(),
        'address-street-2': z.string().nullable(),
        'address-city': z.string().nullable(),
        'address-postal-code': z.string().nullable(),
        'identification-number': z.string().nullable(),
        'phone-number': z.string().nullable(),
      }),
    }),
  })
  .transform((data) => {
    const attributes = data.data.attributes;
    return {
      completedAt: new Date(attributes['completed-at']),
      firstName: attributes['name-first'],
      lastName: attributes['name-last'],
      birthDate: attributes['birthdate'],
      addressStreet1: attributes['address-street-1'],
      addressStreet2: attributes['address-street-2'],
      addressCity: attributes['address-city'],
      addressPostalCode: attributes['address-postal-code'],
      identificationNumber: attributes['identification-number'],
      phoneNumber: attributes['phone-number'],
    };
  });

export type TVerifyInquiryRes = z.infer<typeof verifyInquirySchema>;

export const exchangeCodeForTokenSchema = z
  .object({
    access_token: z.string(),
    user_id: z.string(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    instagramUid: data.user_id,
  }));

export type TExchangeCodeForToken = z.infer<typeof exchangeCodeForTokenSchema>;

export const connectIGSchema = z.object({
  code: z.string(),
});

export type TConnectIG = z.infer<typeof connectIGSchema>;

export const setKYCSchema = z.object({
  inquiryId: z.string(),
});

export type TSetKYC = z.infer<typeof setKYCSchema>;