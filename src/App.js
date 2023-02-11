import { Component } from 'react';
import { Button, Grid, Autocomplete, TextField } from '@mui/material';
import '@fontsource/roboto/300-italic.css';

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.child = new Set();
    this.end = false;
  }
}

class Trie {
  static root = new TrieNode();
  insert(node) {
    let index = 0;
    let last = Trie.root;
    for (let i = 0; i < node.length; i++) {
      index = node.charCodeAt(i) - 97;
      if (last.children[index] == null) last.children[index] = new TrieNode();
      last = last.children[index];
      last.child.add(node);
    }
    last.end = true;
  }
  search(node) {
    let index = 0;
    let last = Trie.root;
    for (let i = 0; i < node.length; i++) {
      index = node.charCodeAt(i) - 97;
      last = last.children[index];
    }
    return last == null ? '' : last.child;
  }
  removeAll() {
    Trie.root = new TrieNode();
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trie: new Trie(),
      val: '',
      suggest: [],
      keywords: 'dictionary,chronicles,language,grows,changes,which,means,new,definitions,must,continually,be,added,when,many,people,use,in,same,way,over,long,enough,period,time,word,becomes,eligible,inclusion,here,are,a,selection,of,words,that,met,the,criteria,for,our,most,recent,update',
      keyArray: ['dictionary', 'chronicles', 'language', 'grows', 'changes', 'which', 'means', 'new', 'definitions', 'must', 'continually', 'be', 'added', 'when', 'many', 'people', 'use', 'in', 'same', 'way', 'over', 'long', 'enough', 'period', 'time', 'word', 'becomes', 'eligible', 'inclusion', 'here', 'are', 'a', 'selection', 'of', 'words', 'that', 'met', 'the', 'criteria', 'for', 'our', 'most', 'recent', 'update']
    }
  }
  insert() {
    this.state.trie.removeAll();
    let array = this.state.keyArray;
    for (let i = 0; i < array.length; i++) {
      this.state.trie.insert(array[i]);
    }
  }

  change(e) {
    this.setState({ val: e.target.value });
    let arr = [];
    this.state.trie.search(e.target.value) !== '' && this.state.trie.search(e.target.value).forEach((e) => arr.push(e));
    this.setState({ suggest: arr });
  }

  render() {
    return (
      <>
        <div style={{textAlign:'center'}}>
          <h1>
            <span style={{color:'#0085ff'}}>S</span>
            <span style={{color:'#D92528'}}>e</span>
            <span style={{color:'#ffd600'}}>a</span>
            <span style={{color:'#0085ff'}}>r</span>
            <span style={{color:'#00ae11'}}>c</span>
            <span style={{color:'#D92528'}}>h</span>
          </h1>
        </div>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Grid container spacing={8}>

            <Grid item xs={10}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.suggest}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} onChange={(e) => this.change(e)} label="Search" />}
              />
            </Grid>


            <Grid item xs={10}>
              <TextField
                id="outlined-multiline-static"
                label="Keywords"
                multiline
                sx={{ width: 300 }}
                rows={4}
                variant="outlined"
                onChange={(e) => this.setState({ keywords: e.target.value, keyArray: e.target.value.split(',') })} value={this.state.keywords}
              />
            </Grid>
            <Grid item xs={10}>
              <Button onClick={() => this.insert()} variant="contained">Insert</Button><br />
              <span style={{ fontSize: '10px', color: 'red' }}>* Insert keywords into Trie</span>
            </Grid>
          </Grid>
        </div >
      </>
    );
  }
}
export default App;

