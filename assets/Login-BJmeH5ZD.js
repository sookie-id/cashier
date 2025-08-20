import{a as r,q as e,w as c,v as u,x as g}from"./chunk-UH6JLGW7-bpHwVU_g.js";import{d as x,o as h}from"./styled-components.browser.esm-BXGlMQFS.js";import{g as m}from"./theme-Dzgt7jho.js";import{s as b,u as f}from"./user-logged-in-7A8xEUaX.js";const w=x.div`
  position: relative;
  display: inline-block;
  width: 300px;

  input {
    width: 100%;
    padding: 16px 12px 6px; /* extra space at top for label */
    border: 2px solid ${({theme:o})=>o.colors.grey[400]};
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: ${({theme:o})=>o.colors.primary1[700]};
  }

  label {
    position: absolute;
    top: -8px;
    left: 12px;
    background: white;
    padding: 0 4px;
    color: ${({theme:o})=>o.colors.grey[900]};
    font-size: 14px;
    pointer-events: none;
    transition: 0.2s ease all;
  }
`;function l({label:o,type:n,onChange:s}){const t=r.useId();return e.jsx(h,{theme:m,children:e.jsxs(w,{children:[e.jsx("input",{type:n,id:t,required:!0,onChange:a=>s(a.target.value)}),e.jsx("label",{htmlFor:t,children:o})]})})}async function j(o,n){const{data:s,error:t}=await b.auth.signInWithPassword({email:o,password:n});if(t)throw t;return s}async function I(){if(await f())throw u("/")}const E=c(function(){const n=g(),[s,t]=r.useState(""),[a,p]=r.useState(""),d=async i=>{i.preventDefault(),await j(s,a),n("/")};return e.jsxs("div",{className:"login-container",children:[e.jsx("h1",{children:"Login"}),e.jsxs("form",{children:[e.jsx(l,{label:"Email",type:"email",onChange:t}),e.jsx(l,{label:"Password",type:"password",onChange:p}),e.jsx("button",{type:"submit",className:"login-button",onClick:i=>d(i),children:"Login"})]})]})});export{I as clientLoader,E as default};
