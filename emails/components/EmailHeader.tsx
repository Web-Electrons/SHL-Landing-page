interface EmailHeaderProps {
  companyName?: string;
}

export const EmailHeader = ({ companyName = "ShipLink" }: EmailHeaderProps) => {
  // return (
  //   <>
  //     <Section style={s.header} className="header-section">
  //       {/* Fixing Yahoo Mail issues it didnt work with pt */}
  //       <tr style={{ height: "39pt" }}>
  //         <td width="100%" style={{ width: "100.0%", background: "#c42626", padding: "0px 10.0pt 0cm 20pt", height: "39pt" }}>
  //           <p style={{ fontFamily: "Arial, Helvetica, sans-serif", lineHeight: "16pt" }}>
  //             <b><span style={{ color: "white", fontSize: "18.0pt" }}>{companyName}<u></u><u></u></span></b>
  //           </p>
  //         </td>
  //       </tr>
  //     </Section>
  //   </>
  // );
  return (
    <>
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: 0,
          backgroundColor: "#c42626",
          // msoTableLspace: "0pt",
          // msoTableRspace: "0pt",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#c42626",
                paddingTop: "14px",
                paddingBottom: "14px",
                paddingLeft: "26px",
                paddingRight: "13px",

                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
                lineHeight: "24px",

                color: "#ffffff",

                msoLineHeightRule: "exactly",

                borderCollapse: "collapse",
              }}
            >
              ShipLink
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
