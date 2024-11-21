"use strict";(self.webpackChunkepisap_swap=self.webpackChunkepisap_swap||[]).push([[643],{47643:(t,e,n)=>{n.d(e,{SIWEController:()=>l});var i=n(33454);n(37810);var s=n(76844),a=n(30574);const r=(0,a.BX)({status:"uninitialized"}),l={state:r,subscribeKey:(t,e)=>(0,s.u$)(r,t,e),subscribe:t=>(0,a.B1)(r,(()=>t(r))),_getClient(){if(!r._client)throw new Error("SIWEController client not set");return r._client},async getNonce(){const t=this._getClient(),e=await t.getNonce();return this.setNonce(e),e},async getSession(){const t=this._getClient(),e=await t.getSession();return e&&(this.setSession(e),this.setStatus("success")),e},createMessage(t){const e=this._getClient().createMessage(t);return this.setMessage(e),e},async verifyMessage(t){const e=this._getClient();return await e.verifyMessage(t)},async signIn(){const t=this._getClient();return await t.signIn()},async signOut(){const t=this._getClient();await t.signOut(),this.setStatus("ready"),t.onSignOut?.()},onSignIn(t){const e=this._getClient();e.onSignIn?.(t)},onSignOut(){const t=this._getClient();t.onSignOut?.()},setSIWEClient(t){r._client=(0,a.KR)(t),r.status="ready",i.Hd.setIsSiweEnabled(t.options.enabled)},setNonce(t){r.nonce=t},setStatus(t){r.status=t},setMessage(t){r.message=t},setSession(t){r.session=t}};var c=n(1341),o=(n(46830),n(28531),n(71331));const u=o.AH`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var g=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let d=class extends o.WF{constructor(){super(...arguments),this.dappImageUrl=i.Hd.state.metadata?.icons,this.walletImageUrl=i.iT.getConnectedWalletImageUrl()}firstUpdated(){const t=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");t?.[0]&&this.createAnimation(t[0],"translate(18px)"),t?.[1]&&this.createAnimation(t[1],"translate(-18px)")}render(){return o.qy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(t,e){t.animate([{transform:"translateX(0px)"},{transform:e}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};d.styles=u,d=g([(0,c.customElement)("w3m-connecting-siwe")],d);n(14121);var w=n(95543),p=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let h=class extends o.WF{constructor(){super(...arguments),this.dappName=i.Hd.state.metadata?.name,this.isSigning=!1}render(){return o.qy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="md"
          ?fullwidth=${!0}
          variant="shade"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="md"
          ?fullwidth=${!0}
          variant="fill"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,i.En.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track"});try{l.setStatus("loading");const t=await l.signIn();return l.setStatus("success"),i.En.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track"}),t}catch(t){return i.Pt.showError("Signature declined"),l.setStatus("error"),i.En.sendEvent({event:"SIWE_AUTH_ERROR",type:"track"})}finally{this.isSigning=!1}}async onCancel(){const{isConnected:t}=i.Uj.state;t?(await i.x4.disconnect(),i.W3.close()):i.IN.push("Connect"),i.En.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track"})}};p([(0,w.w)()],h.prototype,"isSigning",void 0),h=p([(0,c.customElement)("w3m-connecting-siwe-view")],h)}}]);
//# sourceMappingURL=643.347fd046.chunk.js.map