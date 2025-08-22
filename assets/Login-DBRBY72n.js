import{w as l,x as p,y as m,a as i,q as n}from"./chunk-UH6JLGW7-BUnZcASb.js";import{s as h,I as w,P as f,u as x}from"./Input-csiIfA67.js";import{d as a}from"./styled-components.browser.esm-Djro2wrJ.js";async function y(t,o){const{data:e,error:s}=await h.auth.signInWithPassword({email:t,password:o});if(s)throw s;return e}const b=a.div`
  background: white;
  padding: ${({theme:t})=>t.spacing[700]};
  border-radius: ${({theme:t})=>t.spacing[500]};
  box-shadow: ${({theme:t})=>t.shadow[100]};
  width: ${({theme:t})=>t.spacing[1300]};
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing[500]};
  align-items: center;
  transform: translate(-50%, -50%);
`,L=a.h1`
  margin: 0;
  font-size: ${({theme:t})=>t.spacing[600]};
`,r=a(w)`
  width: 100%;
`,j=a(f)`
  width: 100%;
`;async function v(){if(await x())throw p("/")}const C=l(function(){const o=m(),[e,s]=i.useState(""),[d,c]=i.useState(""),u=async g=>{g.preventDefault(),await y(e,d),o("/")};return n.jsx("form",{onSubmit:u,children:n.jsxs(b,{children:[n.jsx(L,{children:"Login"}),n.jsx(r,{label:"Email",type:"email",onChange:s,required:!0}),n.jsx(r,{label:"Password",type:"password",onChange:c,required:!0}),n.jsx(j,{type:"submit",children:"Login"})]})})});export{v as clientLoader,C as default};
