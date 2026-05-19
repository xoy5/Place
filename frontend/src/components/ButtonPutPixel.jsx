function ButtonPutPixel({ selected, paintPixel, setSelected }) {
  return (
    <>
      {selected && (
        <div style={{ marginTop: 16 }}>
          <p>
            Zaznaczony pixel: [{selected.row}, {selected.col}]
          </p>
          <button
            onClick={() => {
              paintPixel(selected.row, selected.col);
              setSelected(null);
            }}
          >
            Postaw pixel
          </button>
        </div>
      )}
    </>
  );
}

export default ButtonPutPixel;
