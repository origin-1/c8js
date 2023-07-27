function a()
{ }
function b() { }
function c(_) { _ && b(); }
0 ? 0 : c(0);
0 ? 0 : c(1);
