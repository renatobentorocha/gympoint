export const customStyles = {
  indicatorSeparator: () => ({}),
  placeholder: () => ({
    color: '#999999',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 15,
    fontWeight: 'normal',
  }),
  input: base => ({
    ...base,
  }),
  singleValue: () => ({
    color: '#999999',
  }),
  container: base => ({
    ...base,
    height: 44,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    color: '#999999',
  }),
  control: base => ({
    ...base,
    border: '1px solid #ddd',
    boxShadow: 'none',
  }),
  option: base => ({
    ...base,
    paddingLeft: 30,
  }),
};
