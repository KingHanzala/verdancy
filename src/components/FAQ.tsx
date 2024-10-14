import backgroundImage from '../assets/cool-background.svg';
const FAQ = () => {
    return (
        <section id="faq" className="relative">
        <div className="absolute inset-0 animate-scroll-background" >
          <div 
              className="absolute inset-0 bg-repeat"
              style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: '200% 200%',
                  transform: 'scaleZ(-1)'
              }}
          ></div>
      </div>
      <div className="relative py-16 px-4 mx-auto max-w-screen-xl">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <div className="flex flex-col items-center pb-5">
            <div className="w-full max-w-6xl">
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" checked={true} />
                    <div className="collapse-title text-xl font-medium text-gray-900">
                        Why do we need decentralized governance?
                    </div>
                    <div className="collapse-content text-gray-900">
                        <p>Decentralized governance promotes transparency, user empowerment, and resistance to censorship by distributing decision-making power among participants. It aligns with decentralization principles, reduces centralized risks, and enhances security. By involving the community, it fosters collective decision-making and adaptability, ensuring decisions reflect the broader ecosystem's interests and long-term viability.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-gray-900">
                        What problem does Verdancy solve?
                    </div>
                    <div className="collapse-content text-gray-900">
                        <p>Verdancy solves the problem of centralized decision-making by empowering token holders to directly influence project direction based on their stake. It ensures democratic, transparent governance where voting power is proportional to token ownership, while encouraging consistent community participation through incentivized engagement and flexible poll creation for project decisions.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-gray-900">
                        How will Verdancy empower web3 communities?
                    </div>
                    <div className="collapse-content text-gray-900">
                        <p>Verdancy will empower Web3 communities by giving token holders direct control over project decisions through a decentralized, token-based voting system. By tying voting power to token ownership, Verdancy ensures that decisions reflect the interests of those most invested. Additionally, its incentivized participation model encourages active engagement, fostering stronger, more autonomous communities. The platform's flexible poll creation feature allows communities to vote on a wide range of issues, from operational choices to major strategic shifts, further enhancing their influence and collaboration in shaping project outcomes.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </section>
    );
}

export default FAQ;
