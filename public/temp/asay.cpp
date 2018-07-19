#include<iostream>
using namespace std;
class volume
{
private:
    int vol;
    int l,b,h;
public:
    volume();
    volume(int,int,int =8);
    ~volume();
    void calc(int);
    void display();
};
int main()
{
    volume v1,v2(10,10);
    v1.calc(8);
    v2.calc(8);
    v1.display();
    v2.display();
}
volume::volume()
{
    l=5;
    b=5;
    h=5;
}
volume::volume(int a,int br,int c)
{
    l=a;
    b=br;
    h=c;
}
void volume::calc(int i=0)
{
    vol = l*b*h*i;
}
void volume:: display()
{
    cout<<"volume is: "<<vol<<endl;
}
volume::~volume()
{
    cout<<"destructor called the breath is : "<<b<<endl;
}
