[pan-cortex-data-lake](../README.md) › [Http2FetchOpts](http2fetchopts.md)

# Interface: Http2FetchOpts

Options to configure a `Http2Fetch` object

## Hierarchy

* ClientSessionOptions

* SecureClientSessionOptions

  ↳ **Http2FetchOpts**

## Index

### Properties

* [ALPNProtocols](http2fetchopts.md#optional-alpnprotocols)
* [SNICallback](http2fetchopts.md#optional-snicallback)
* [ca](http2fetchopts.md#optional-ca)
* [cert](http2fetchopts.md#optional-cert)
* [checkServerIdentity](http2fetchopts.md#optional-checkserveridentity)
* [ciphers](http2fetchopts.md#optional-ciphers)
* [clientCertEngine](http2fetchopts.md#optional-clientcertengine)
* [cortexBaseFqdn](http2fetchopts.md#optional-cortexbasefqdn)
* [cortexDefCredentials](http2fetchopts.md#optional-cortexdefcredentials)
* [createConnection](http2fetchopts.md#optional-createconnection)
* [crl](http2fetchopts.md#optional-crl)
* [dhparam](http2fetchopts.md#optional-dhparam)
* [ecdhCurve](http2fetchopts.md#optional-ecdhcurve)
* [enableTrace](http2fetchopts.md#optional-enabletrace)
* [honorCipherOrder](http2fetchopts.md#optional-honorcipherorder)
* [host](http2fetchopts.md#optional-host)
* [key](http2fetchopts.md#optional-key)
* [lookup](http2fetchopts.md#optional-lookup)
* [maxDeflateDynamicTableSize](http2fetchopts.md#optional-maxdeflatedynamictablesize)
* [maxHeaderListPairs](http2fetchopts.md#optional-maxheaderlistpairs)
* [maxOutstandingPings](http2fetchopts.md#optional-maxoutstandingpings)
* [maxReservedRemoteStreams](http2fetchopts.md#optional-maxreservedremotestreams)
* [maxSendHeaderBlockLength](http2fetchopts.md#optional-maxsendheaderblocklength)
* [maxSessionMemory](http2fetchopts.md#optional-maxsessionmemory)
* [maxVersion](http2fetchopts.md#optional-maxversion)
* [minDHSize](http2fetchopts.md#optional-mindhsize)
* [minVersion](http2fetchopts.md#optional-minversion)
* [paddingStrategy](http2fetchopts.md#optional-paddingstrategy)
* [passphrase](http2fetchopts.md#optional-passphrase)
* [path](http2fetchopts.md#optional-path)
* [peerMaxConcurrentStreams](http2fetchopts.md#optional-peermaxconcurrentstreams)
* [pfx](http2fetchopts.md#optional-pfx)
* [port](http2fetchopts.md#optional-port)
* [privateKeyEngine](http2fetchopts.md#optional-privatekeyengine)
* [privateKeyIdentifier](http2fetchopts.md#optional-privatekeyidentifier)
* [protocol](http2fetchopts.md#optional-protocol)
* [rejectUnauthorized](http2fetchopts.md#optional-rejectunauthorized)
* [requestCert](http2fetchopts.md#optional-requestcert)
* [secureContext](http2fetchopts.md#optional-securecontext)
* [secureOptions](http2fetchopts.md#optional-secureoptions)
* [secureProtocol](http2fetchopts.md#optional-secureprotocol)
* [servername](http2fetchopts.md#optional-servername)
* [session](http2fetchopts.md#optional-session)
* [sessionIdContext](http2fetchopts.md#optional-sessionidcontext)
* [settings](http2fetchopts.md#optional-settings)
* [sigalgs](http2fetchopts.md#optional-sigalgs)
* [socket](http2fetchopts.md#optional-socket)
* [timeout](http2fetchopts.md#optional-timeout)

### Methods

* [pskCallback](http2fetchopts.md#optional-pskcallback)
* [selectPadding](http2fetchopts.md#optional-selectpadding)

## Properties

### `Optional` ALPNProtocols

• **ALPNProtocols**? : *string[] | Uint8Array[] | Uint8Array*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[ALPNProtocols](http2fetchopts.md#optional-alpnprotocols)*

Defined in node_modules/@types/node/tls.d.ts:359

An array of strings or a Buffer naming possible ALPN protocols.
(Protocols should be ordered by their priority.)

___

### `Optional` SNICallback

• **SNICallback**? : *undefined | function*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[SNICallback](http2fetchopts.md#optional-snicallback)*

Defined in node_modules/@types/node/tls.d.ts:369

SNICallback(servername, cb) <Function> A function that will be
called if the client supports SNI TLS extension. Two arguments
will be passed when called: servername and cb. SNICallback should
invoke cb(null, ctx), where ctx is a SecureContext instance.
(tls.createSecureContext(...) can be used to get a proper
SecureContext.) If SNICallback wasn't provided the default callback
with high-level API will be used (see below).

___

### `Optional` ca

• **ca**? : *string | Buffer | Array‹string | Buffer›*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[ca](http2fetchopts.md#optional-ca)*

Defined in node_modules/@types/node/tls.d.ts:560

Optionally override the trusted CA certificates. Default is to trust
the well-known CAs curated by Mozilla. Mozilla's CAs are completely
replaced when CAs are explicitly specified using this option.

___

### `Optional` cert

• **cert**? : *string | Buffer | Array‹string | Buffer›*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[cert](http2fetchopts.md#optional-cert)*

Defined in node_modules/@types/node/tls.d.ts:572

 Cert chains in PEM format. One cert chain should be provided per
 private key. Each cert chain should consist of the PEM formatted
 certificate for a provided private key, followed by the PEM
 formatted intermediate certificates (if any), in order, and not
 including the root CA (the root CA must be pre-known to the peer,
 see ca). When providing multiple cert chains, they do not have to
 be in the same order as their private keys in key. If the
 intermediate certificates are not provided, the peer will not be
 able to validate the certificate, and the handshake will fail.

___

### `Optional` checkServerIdentity

• **checkServerIdentity**? : *typeof checkServerIdentity*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[checkServerIdentity](http2fetchopts.md#optional-checkserveridentity)*

Defined in node_modules/@types/node/tls.d.ts:438

___

### `Optional` ciphers

• **ciphers**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[ciphers](http2fetchopts.md#optional-ciphers)*

Defined in node_modules/@types/node/tls.d.ts:586

Cipher suite specification, replacing the default. For more
information, see modifying the default cipher suite. Permitted
ciphers can be obtained via tls.getCiphers(). Cipher names must be
uppercased in order for OpenSSL to accept them.

___

### `Optional` clientCertEngine

• **clientCertEngine**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[clientCertEngine](http2fetchopts.md#optional-clientcertengine)*

Defined in node_modules/@types/node/tls.d.ts:590

Name of an OpenSSL engine which can provide the client certificate.

___

### `Optional` cortexBaseFqdn

• **cortexBaseFqdn**? : *undefined | string*

*Defined in [src/http2client.ts:65](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/http2client.ts#L65)*

Cortex API default FQDN to use in operations that do not provide an
explicit `Credentials` object

___

### `Optional` cortexDefCredentials

• **cortexDefCredentials**? : *[Credentials](credentials.md)*

*Defined in [src/http2client.ts:69](https://github.com/xhoms/pan-cortex-data-lake-nodejs/blob/dcdea9e/src/http2client.ts#L69)*

If provided, then all operations will use this `Credential`'s JWT token

___

### `Optional` createConnection

• **createConnection**? : *undefined | function*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[createConnection](http2fetchopts.md#optional-createconnection)*

*Overrides void*

Defined in node_modules/@types/node/http2.d.ts:442

___

### `Optional` crl

• **crl**? : *string | Buffer | Array‹string | Buffer›*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[crl](http2fetchopts.md#optional-crl)*

Defined in node_modules/@types/node/tls.d.ts:594

PEM formatted CRLs (Certificate Revocation Lists).

___

### `Optional` dhparam

• **dhparam**? : *string | Buffer*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[dhparam](http2fetchopts.md#optional-dhparam)*

Defined in node_modules/@types/node/tls.d.ts:603

Diffie Hellman parameters, required for Perfect Forward Secrecy. Use
openssl dhparam to create the parameters. The key length must be
greater than or equal to 1024 bits or else an error will be thrown.
Although 1024 bits is permissible, use 2048 bits or larger for
stronger security. If omitted or invalid, the parameters are
silently discarded and DHE ciphers will not be available.

___

### `Optional` ecdhCurve

• **ecdhCurve**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[ecdhCurve](http2fetchopts.md#optional-ecdhcurve)*

Defined in node_modules/@types/node/tls.d.ts:613

A string describing a named curve or a colon separated list of curve
NIDs or names, for example P-521:P-384:P-256, to use for ECDH key
agreement. Set to auto to select the curve automatically. Use
crypto.getCurves() to obtain a list of available curve names. On
recent releases, openssl ecparam -list_curves will also display the
name and description of each available elliptic curve. Default:
tls.DEFAULT_ECDH_CURVE.

___

### `Optional` enableTrace

• **enableTrace**? : *undefined | false | true*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[enableTrace](http2fetchopts.md#optional-enabletrace)*

Defined in node_modules/@types/node/tls.d.ts:348

When enabled, TLS packet trace information is written to `stderr`. This can be
used to debug TLS connection problems.

**`default`** false

___

### `Optional` honorCipherOrder

• **honorCipherOrder**? : *undefined | false | true*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[honorCipherOrder](http2fetchopts.md#optional-honorcipherorder)*

Defined in node_modules/@types/node/tls.d.ts:619

Attempt to use the server's cipher suite preferences instead of the
client's. When true, causes SSL_OP_CIPHER_SERVER_PREFERENCE to be
set in secureOptions

___

### `Optional` host

• **host**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[host](http2fetchopts.md#optional-host)*

Defined in node_modules/@types/node/tls.d.ts:434

___

### `Optional` key

• **key**? : *string | Buffer | Array‹Buffer | KeyObject›*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[key](http2fetchopts.md#optional-key)*

Defined in node_modules/@types/node/tls.d.ts:630

Private keys in PEM format. PEM allows the option of private keys
being encrypted. Encrypted keys will be decrypted with
options.passphrase. Multiple keys using different algorithms can be
provided either as an array of unencrypted key strings or buffers,
or an array of objects in the form {pem: <string|buffer>[,
passphrase: <string>]}. The object form can only occur in an array.
object.passphrase is optional. Encrypted keys will be decrypted with
object.passphrase if provided, or options.passphrase if it is not.

___

### `Optional` lookup

• **lookup**? : *net.LookupFunction*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[lookup](http2fetchopts.md#optional-lookup)*

Defined in node_modules/@types/node/tls.d.ts:442

___

### `Optional` maxDeflateDynamicTableSize

• **maxDeflateDynamicTableSize**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxDeflateDynamicTableSize](http2fetchopts.md#optional-maxdeflatedynamictablesize)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxDeflateDynamicTableSize](http2fetchopts.md#optional-maxdeflatedynamictablesize)*

Defined in node_modules/@types/node/http2.d.ts:427

___

### `Optional` maxHeaderListPairs

• **maxHeaderListPairs**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxHeaderListPairs](http2fetchopts.md#optional-maxheaderlistpairs)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxHeaderListPairs](http2fetchopts.md#optional-maxheaderlistpairs)*

Defined in node_modules/@types/node/http2.d.ts:429

___

### `Optional` maxOutstandingPings

• **maxOutstandingPings**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxOutstandingPings](http2fetchopts.md#optional-maxoutstandingpings)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxOutstandingPings](http2fetchopts.md#optional-maxoutstandingpings)*

Defined in node_modules/@types/node/http2.d.ts:430

___

### `Optional` maxReservedRemoteStreams

• **maxReservedRemoteStreams**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxReservedRemoteStreams](http2fetchopts.md#optional-maxreservedremotestreams)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxReservedRemoteStreams](http2fetchopts.md#optional-maxreservedremotestreams)*

Defined in node_modules/@types/node/http2.d.ts:441

___

### `Optional` maxSendHeaderBlockLength

• **maxSendHeaderBlockLength**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxSendHeaderBlockLength](http2fetchopts.md#optional-maxsendheaderblocklength)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxSendHeaderBlockLength](http2fetchopts.md#optional-maxsendheaderblocklength)*

Defined in node_modules/@types/node/http2.d.ts:431

___

### `Optional` maxSessionMemory

• **maxSessionMemory**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxSessionMemory](http2fetchopts.md#optional-maxsessionmemory)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[maxSessionMemory](http2fetchopts.md#optional-maxsessionmemory)*

Defined in node_modules/@types/node/http2.d.ts:428

___

### `Optional` maxVersion

• **maxVersion**? : *SecureVersion*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[maxVersion](http2fetchopts.md#optional-maxversion)*

Defined in node_modules/@types/node/tls.d.ts:650

Optionally set the maximum TLS version to allow. One
of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
`secureProtocol` option, use one or the other.
**Default:** `'TLSv1.3'`, unless changed using CLI options. Using
`--tls-max-v1.2` sets the default to `'TLSv1.2'`. Using `--tls-max-v1.3` sets the default to
`'TLSv1.3'`. If multiple of the options are provided, the highest maximum is used.

___

### `Optional` minDHSize

• **minDHSize**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[minDHSize](http2fetchopts.md#optional-mindhsize)*

Defined in node_modules/@types/node/tls.d.ts:441

___

### `Optional` minVersion

• **minVersion**? : *SecureVersion*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[minVersion](http2fetchopts.md#optional-minversion)*

Defined in node_modules/@types/node/tls.d.ts:661

Optionally set the minimum TLS version to allow. One
of `'TLSv1.3'`, `'TLSv1.2'`, `'TLSv1.1'`, or `'TLSv1'`. Cannot be specified along with the
`secureProtocol` option, use one or the other.  It is not recommended to use
less than TLSv1.2, but it may be required for interoperability.
**Default:** `'TLSv1.2'`, unless changed using CLI options. Using
`--tls-v1.0` sets the default to `'TLSv1'`. Using `--tls-v1.1` sets the default to
`'TLSv1.1'`. Using `--tls-min-v1.3` sets the default to
'TLSv1.3'. If multiple of the options are provided, the lowest minimum is used.

___

### `Optional` paddingStrategy

• **paddingStrategy**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[paddingStrategy](http2fetchopts.md#optional-paddingstrategy)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[paddingStrategy](http2fetchopts.md#optional-paddingstrategy)*

Defined in node_modules/@types/node/http2.d.ts:432

___

### `Optional` passphrase

• **passphrase**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[passphrase](http2fetchopts.md#optional-passphrase)*

Defined in node_modules/@types/node/tls.d.ts:665

Shared passphrase used for a single private key and/or a PFX.

___

### `Optional` path

• **path**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[path](http2fetchopts.md#optional-path)*

Defined in node_modules/@types/node/tls.d.ts:436

___

### `Optional` peerMaxConcurrentStreams

• **peerMaxConcurrentStreams**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[peerMaxConcurrentStreams](http2fetchopts.md#optional-peermaxconcurrentstreams)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[peerMaxConcurrentStreams](http2fetchopts.md#optional-peermaxconcurrentstreams)*

Defined in node_modules/@types/node/http2.d.ts:433

___

### `Optional` pfx

• **pfx**? : *string | Buffer | Array‹string | Buffer | PxfObject›*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[pfx](http2fetchopts.md#optional-pfx)*

Defined in node_modules/@types/node/tls.d.ts:676

PFX or PKCS12 encoded private key and certificate chain. pfx is an
alternative to providing key and cert individually. PFX is usually
encrypted, if it is, passphrase will be used to decrypt it. Multiple
PFX can be provided either as an array of unencrypted PFX buffers,
or an array of objects in the form {buf: <string|buffer>[,
passphrase: <string>]}. The object form can only occur in an array.
object.passphrase is optional. Encrypted PFX will be decrypted with
object.passphrase if provided, or options.passphrase if it is not.

___

### `Optional` port

• **port**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[port](http2fetchopts.md#optional-port)*

Defined in node_modules/@types/node/tls.d.ts:435

___

### `Optional` privateKeyEngine

• **privateKeyEngine**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[privateKeyEngine](http2fetchopts.md#optional-privatekeyengine)*

Defined in node_modules/@types/node/tls.d.ts:635

Name of an OpenSSL engine to get private key from. Should be used
together with privateKeyIdentifier.

___

### `Optional` privateKeyIdentifier

• **privateKeyIdentifier**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[privateKeyIdentifier](http2fetchopts.md#optional-privatekeyidentifier)*

Defined in node_modules/@types/node/tls.d.ts:641

Identifier of a private key managed by an OpenSSL engine. Should be
used together with privateKeyEngine. Should not be set together with
key, because both options define a private key in different ways.

___

### `Optional` protocol

• **protocol**? : *"http:" | "https:"*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[protocol](http2fetchopts.md#optional-protocol)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[protocol](http2fetchopts.md#optional-protocol)*

Defined in node_modules/@types/node/http2.d.ts:443

___

### `Optional` rejectUnauthorized

• **rejectUnauthorized**? : *undefined | false | true*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[rejectUnauthorized](http2fetchopts.md#optional-rejectunauthorized)*

Defined in node_modules/@types/node/tls.d.ts:376

If true the server will reject any connection which is not
authorized with the list of supplied CAs. This option only has an
effect if requestCert is true.

**`default`** true

___

### `Optional` requestCert

• **requestCert**? : *undefined | false | true*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[requestCert](http2fetchopts.md#optional-requestcert)*

Defined in node_modules/@types/node/tls.d.ts:354

If true the server will request a certificate from clients that
connect and attempt to verify that certificate. Defaults to
false.

___

### `Optional` secureContext

• **secureContext**? : *SecureContext*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[secureContext](http2fetchopts.md#optional-securecontext)*

Defined in node_modules/@types/node/tls.d.ts:341

An optional TLS context object from tls.createSecureContext()

___

### `Optional` secureOptions

• **secureOptions**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[secureOptions](http2fetchopts.md#optional-secureoptions)*

Defined in node_modules/@types/node/tls.d.ts:682

Optionally affect the OpenSSL protocol behavior, which is not
usually necessary. This should be used carefully if at all! Value is
a numeric bitmask of the SSL_OP_* options from OpenSSL Options

___

### `Optional` secureProtocol

• **secureProtocol**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[secureProtocol](http2fetchopts.md#optional-secureprotocol)*

Defined in node_modules/@types/node/tls.d.ts:694

Legacy mechanism to select the TLS protocol version to use, it does
not support independent control of the minimum and maximum version,
and does not support limiting the protocol to TLSv1.3. Use
minVersion and maxVersion instead. The possible values are listed as
SSL_METHODS, use the function names as strings. For example, use
'TLSv1_1_method' to force TLS version 1.1, or 'TLS_method' to allow
any TLS protocol version up to TLSv1.3. It is not recommended to use
TLS versions less than 1.2, but it may be required for
interoperability. Default: none, see minVersion.

___

### `Optional` servername

• **servername**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[servername](http2fetchopts.md#optional-servername)*

Defined in node_modules/@types/node/tls.d.ts:439

___

### `Optional` session

• **session**? : *Buffer*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[session](http2fetchopts.md#optional-session)*

Defined in node_modules/@types/node/tls.d.ts:440

___

### `Optional` sessionIdContext

• **sessionIdContext**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[sessionIdContext](http2fetchopts.md#optional-sessionidcontext)*

Defined in node_modules/@types/node/tls.d.ts:699

Opaque identifier used by servers to ensure session state is not
shared between applications. Unused by clients.

___

### `Optional` settings

• **settings**? : *Settings*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[settings](http2fetchopts.md#optional-settings)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[settings](http2fetchopts.md#optional-settings)*

Defined in node_modules/@types/node/http2.d.ts:434

___

### `Optional` sigalgs

• **sigalgs**? : *undefined | string*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[sigalgs](http2fetchopts.md#optional-sigalgs)*

Defined in node_modules/@types/node/tls.d.ts:579

 Colon-separated list of supported signature algorithms. The list
 can contain digest algorithms (SHA256, MD5 etc.), public key
 algorithms (RSA-PSS, ECDSA etc.), combination of both (e.g
 'RSA+SHA384') or TLS v1.3 scheme names (e.g. rsa_pss_pss_sha512).

___

### `Optional` socket

• **socket**? : *net.Socket*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[socket](http2fetchopts.md#optional-socket)*

Defined in node_modules/@types/node/tls.d.ts:437

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[timeout](http2fetchopts.md#optional-timeout)*

Defined in node_modules/@types/node/tls.d.ts:443

## Methods

### `Optional` pskCallback

▸ **pskCallback**(`hint`: string | null): *PSKCallbackNegotation | null*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[pskCallback](http2fetchopts.md#optional-pskcallback)*

Defined in node_modules/@types/node/tls.d.ts:461

When negotiating TLS-PSK (pre-shared keys), this function is called
with optional identity `hint` provided by the server or `null`
in case of TLS 1.3 where `hint` was removed.
It will be necessary to provide a custom `tls.checkServerIdentity()`
for the connection as the default one will try to check hostname/IP
of the server against the certificate but that's not applicable for PSK
because there won't be a certificate present.
More information can be found in the RFC 4279.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hint` | string &#124; null | message sent from the server to help client decide which identity to use during negotiation. Always `null` if TLS 1.3 is used. |

**Returns:** *PSKCallbackNegotation | null*

Return `null` to stop the negotiation process. `psk` must be
compatible with the selected cipher's digest.
`identity` must use UTF-8 encoding.

___

### `Optional` selectPadding

▸ **selectPadding**(`frameLen`: number, `maxFrameLen`: number): *number*

*Inherited from [Http2FetchOpts](http2fetchopts.md).[selectPadding](http2fetchopts.md#optional-selectpadding)*

*Overrides [Http2FetchOpts](http2fetchopts.md).[selectPadding](http2fetchopts.md#optional-selectpadding)*

Defined in node_modules/@types/node/http2.d.ts:436

**Parameters:**

Name | Type |
------ | ------ |
`frameLen` | number |
`maxFrameLen` | number |

**Returns:** *number*
